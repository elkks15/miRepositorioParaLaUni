import express from "express";
import session from "express-session";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import cors from "cors";
import { randomUUID } from "crypto";

const PORT = Number(process.env.PORT) || 3051;
const MAX_MESSAGES = 500;
const REDIS_URL = process.env.REDIS_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || "cambia-el-secreto-en-produccion";
const isProd = process.env.NODE_ENV === "production";

/** Varias URLs separadas por coma: localhost + IP LAN del servidor (CORS y Socket.IO). */
function parseClientOrigins() {
  const raw =
    process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const allowedOrigins = parseClientOrigins();

function corsOriginCallback(origin, callback) {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  callback(null, false);
}

if (!REDIS_URL) {
  console.error("ChatMSG Fase2: define REDIS_URL (Redis remoto).");
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: corsOriginCallback,
    credentials: true
  })
);
app.use(express.json());

/** Mensajes solo en memoria de ESTE proceso (sin persistencia en Redis). */
/** @type {{ id: string, type: 'chat' | 'system', user?: string, text: string, ts: number }[]} */
const messages = [];

/** socket.id -> nombre visible (memoria local). */
const socketUsers = new Map();

function sanitizeUsername(raw) {
  const s = String(raw ?? "").trim();
  if (!s || s.length > 32) return null;
  return s;
}

function pushMessage(entry) {
  messages.push(entry);
  while (messages.length > MAX_MESSAGES) messages.shift();
}

async function bootstrap() {
  const sessionRedis = createClient({ url: REDIS_URL });
  await sessionRedis.connect();

  const pubClient = createClient({ url: REDIS_URL });
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]);

  const sessionMiddleware = session({
    store: new RedisStore({
      client: sessionRedis,
      prefix: "chatmsg:f2:sess:"
    }),
    name: "chatmsg.f2.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  });

  app.use(sessionMiddleware);

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.adapter(createAdapter(pubClient, subClient));
  io.engine.use(sessionMiddleware);

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, port: PORT, instance: String(PORT) });
  });

  app.get("/api/session", (req, res) => {
    const nickname = req.session?.nickname;
    if (!nickname) {
      return res.status(401).json({ authenticated: false });
    }
    res.json({ authenticated: true, nickname });
  });

  app.post("/api/session", (req, res) => {
    const nickname = sanitizeUsername(req.body?.nickname);
    if (!nickname) {
      return res.status(400).json({
        error: "Nombre inválido (1–32 caracteres)."
      });
    }
    req.session.nickname = nickname;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo guardar la sesión." });
      }
      res.json({ ok: true, nickname });
    });
  });

  app.delete("/api/session", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo cerrar la sesión." });
      }
      res.json({ ok: true });
    });
  });

  app.get("/api/messages", (req, res) => {
    if (!req.session?.nickname) {
      return res.status(401).json({ error: "Sesión requerida." });
    }
    res.json({ messages, note: "Historial solo en memoria de esta instancia." });
  });

  io.on("connection", (socket) => {
    const nickname = sanitizeUsername(socket.request.session?.nickname);
    if (!nickname) {
      socket.emit("error:auth", {
        message: "Sesión no válida. Entra de nuevo con tu nombre."
      });
      socket.disconnect(true);
      return;
    }

    socketUsers.set(socket.id, nickname);

    const joinMsg = {
      id: randomUUID(),
      type: "system",
      text: `${nickname} se ha unido al chat (nodo ${PORT}).`,
      ts: Date.now()
    };
    pushMessage(joinMsg);

    socket.emit("history", { messages: [...messages], serverPort: PORT });
    io.except(socket.id).emit("message:new", { message: joinMsg });

    socket.on("chat:send", (payload) => {
      const text = String(payload?.text ?? "").trim();
      if (!text || text.length > 2000) return;

      const user = socketUsers.get(socket.id);
      if (!user) return;

      const entry = {
        id: randomUUID(),
        type: "chat",
        user,
        text,
        ts: Date.now()
      };
      pushMessage(entry);
      io.emit("message:new", { message: entry });
    });

    socket.on("disconnect", () => {
      const left = socketUsers.get(socket.id);
      socketUsers.delete(socket.id);
      if (!left) return;

      const leaveMsg = {
        id: randomUUID(),
        type: "system",
        text: `${left} ha salido del chat.`,
        ts: Date.now()
      };
      pushMessage(leaveMsg);
      io.emit("message:new", { message: leaveMsg });
    });
  });

  httpServer.listen(PORT, () => {
    console.log(
      `ChatMSG Fase2 — http://localhost:${PORT} | Redis adapter + sesión Redis`
    );
    console.log(`  Orígenes CORS permitidos: ${allowedOrigins.join(" | ")}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
