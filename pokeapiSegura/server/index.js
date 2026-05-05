import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();
/* Puerto fijo distinto al típico 3001 por si otra app ya lo usa; override: PORT=... */
const PORT = Number(process.env.PORT) || 3040;
const isProd = process.env.NODE_ENV === "production";
const POKE = "https://pokeapi.co/api/v2";

/* Usuarios de demostración (solo para práctica; en producción usar hash y BD) */
const USUARIOS = { admin: "1234" };

app.set("trust proxy", 1);

app.use(
  cors({
    origin: isProd
      ? process.env.ORIGIN || "http://localhost:5173"
      : "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    name: "poke.sid",
    secret: process.env.SESSION_SECRET || "cambia-esto-en-produccion",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const u = String(username || "").trim();
  const p = String(password || "");
  if (USUARIOS[u] === p) {
    req.session.user = { username: u };
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo guardar la sesión" });
      }
      res.json({ ok: true, user: { username: u } });
    });
    return;
  }
  return res.status(401).json({ error: "Credenciales inválidas" });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("poke.sid", { path: "/" });
    res.json({ ok: true });
  });
});

app.get("/api/auth/me", (req, res) => {
  if (req.session?.user) {
    return res.json({ user: req.session.user });
  }
  return res.status(401).json({ error: "No autenticado" });
});

function requiereSesion(req, res, next) {
  if (req.session?.user) return next();
  return res.status(401).json({ error: "No autenticado" });
}

async function fetchPoke(ruta) {
  const r = await fetch(POKE + ruta);
  if (r.status === 404) return { status: 404, body: null };
  if (!r.ok) throw new Error("PokeAPI: " + r.status);
  const data = await r.json();
  return { status: 200, body: data };
}

app.get("/api/pokemon", requiereSesion, async (req, res) => {
  const offset = Math.max(0, Number(req.query.offset) || 0);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  try {
    const r = await fetch(`${POKE}/pokemon?offset=${offset}&limit=${limit}`);
    if (!r.ok) return res.status(502).json({ error: "PokeAPI no disponible" });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message || "Error" });
  }
});

app.get("/api/pokemon/search/:name", requiereSesion, async (req, res) => {
  const name = encodeURIComponent(String(req.params.name).trim().toLowerCase());
  if (!name) return res.status(400).json({ error: "Nombre requerido" });
  try {
    const r = await fetch(`${POKE}/pokemon/${name}`);
    if (r.status === 404) return res.status(404).json({ error: "Pokémon no encontrado" });
    if (!r.ok) return res.status(502).json({ error: "PokeAPI" });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message || "Error" });
  }
});

app.get("/api/pokemon/:id", requiereSesion, async (req, res) => {
  const id = encodeURIComponent(String(req.params.id).trim());
  if (!id) return res.status(400).json({ error: "Id o nombre requerido" });
  try {
    const { status, body } = await fetchPoke("/pokemon/" + id);
    if (status === 404) return res.status(404).json({ error: "Pokémon no encontrado" });
    res.json(body);
  } catch (e) {
    res.status(500).json({ error: e.message || "Error" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`API sesión: http://localhost:${PORT}`);
});
server.on("error", (e) => {
  if (e?.code === "EADDRINUSE") {
    console.error(
      `[pokeapi-segura] El puerto ${PORT} ya está en uso. Cierra la otra instancia o usa, por ejemplo:\n  PORT=3050 npm run dev\n`
    );
  } else {
    console.error(e);
  }
  process.exit(1);
});
