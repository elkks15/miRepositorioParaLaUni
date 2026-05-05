import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = Number(process.env.PORT) || 3050;
const MAX_MESSAGES = 500;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);
app.use(express.json());

/** @type {{ id: string, type: 'chat' | 'system', user?: string, text: string, ts: number }[]} */
const messages = [];
let msgSeq = 0;

function pushMessage(entry) {
  messages.push(entry);
  while (messages.length > MAX_MESSAGES) messages.shift();
}

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

/** socket.id -> nombre visible */
const socketUsers = new Map();

function sanitizeUsername(raw) {
  const s = String(raw ?? "").trim();
  if (!s || s.length > 32) return null;
  return s;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/messages", (_req, res) => {
  res.json({ messages });
});

io.on("connection", (socket) => {
  const username = sanitizeUsername(socket.handshake.auth?.username);
  if (!username) {
    socket.emit("error:auth", { message: "Nombre inválido (1–32 caracteres)." });
    socket.disconnect(true);
    return;
  }

  socketUsers.set(socket.id, username);
  pushMessage({
    id: `sys-${++msgSeq}`,
    type: "system",
    text: `${username} se ha unido al chat.`,
    ts: Date.now()
  });

  socket.emit("history", { messages: [...messages] });
  socket.broadcast.emit("message:new", {
    message: messages[messages.length - 1]
  });

  socket.on("chat:send", (payload) => {
    const text = String(payload?.text ?? "").trim();
    if (!text || text.length > 2000) return;

    const user = socketUsers.get(socket.id);
    if (!user) return;

    const entry = {
      id: `m-${++msgSeq}`,
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

    pushMessage({
      id: `sys-${++msgSeq}`,
      type: "system",
      text: `${left} ha salido del chat.`,
      ts: Date.now()
    });
    io.emit("message:new", {
      message: messages[messages.length - 1]
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`ChatMSG Fase1 — servidor en http://localhost:${PORT}`);
});
