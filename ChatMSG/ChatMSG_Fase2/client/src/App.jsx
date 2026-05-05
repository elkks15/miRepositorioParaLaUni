import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

async function api(path, options = {}) {
  const { headers: extraHeaders, ...rest } = options;
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders
    },
    ...rest
  });
  return res;
}

export default function App() {
  const [nickname, setNickname] = useState("");
  const [joined, setJoined] = useState(false);
  const [inputNick, setInputNick] = useState("");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("desconectado");
  const [error, setError] = useState("");
  const [serverPort, setServerPort] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const listRef = useRef(null);
  const socketRef = useRef(null);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api("/api/session");
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.nickname) {
            setNickname(data.nickname);
            setJoined(true);
          }
        }
      } catch {
        /* ignorar: sin servidor */
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!joined || !sessionChecked) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"]
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("conectado");
      setError("");
    });

    socket.on("disconnect", () => {
      setStatus("desconectado");
    });

    socket.on("connect_error", (err) => {
      setError(err.message || "No se pudo conectar.");
      setStatus("error");
    });

    socket.on("error:auth", (payload) => {
      setError(payload?.message || "Sesión no válida.");
      setJoined(false);
      setNickname("");
    });

    socket.on("history", ({ messages: hist, serverPort: port }) => {
      setMessages(hist ?? []);
      if (typeof port === "number") setServerPort(port);
    });

    socket.on("message:new", ({ message }) => {
      if (message) appendMessage(message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [joined, sessionChecked, appendMessage]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const canJoin = useMemo(() => inputNick.trim().length > 0, [inputNick]);

  async function handleJoin(e) {
    e.preventDefault();
    const name = inputNick.trim();
    if (!name || name.length > 32) {
      setError("El nombre debe tener entre 1 y 32 caracteres.");
      return;
    }
    setError("");
    try {
      const res = await api("/api/session", {
        method: "POST",
        body: JSON.stringify({ nickname: name })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión.");
        return;
      }
      setNickname(data.nickname || name);
      setJoined(true);
    } catch {
      setError("No hay respuesta del servidor.");
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !socketRef.current) return;
    socketRef.current.emit("chat:send", { text });
    setDraft("");
  }

  async function handleLeave() {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    try {
      await api("/api/session", { method: "DELETE" });
    } catch {
      /* sin servidor */
    }
    setJoined(false);
    setMessages([]);
    setNickname("");
    setInputNick("");
    setServerPort(null);
    setStatus("desconectado");
  }

  if (!sessionChecked) {
    return (
      <div className="shell">
        <p className="muted center">Comprobando sesión…</p>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="shell">
        <div className="card join-card">
          <h1>ChatMSG — Fase 2</h1>
          <p className="muted">
            Redis remoto (pub/sub vía adaptador de Socket.IO), cookie de sesión
            httpOnly y varias instancias de servidor. Los mensajes no se guardan
            en Redis: solo memoria local por nodo.
          </p>
          <form onSubmit={handleJoin}>
            <label htmlFor="nick">Tu nombre en el chat</label>
            <input
              id="nick"
              type="text"
              autoComplete="username"
              maxLength={32}
              placeholder="Ej. Ana"
              value={inputNick}
              onChange={(e) => setInputNick(e.target.value)}
            />
            {error ? <p className="err">{error}</p> : null}
            <button type="submit" disabled={!canJoin}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <strong>ChatMSG</strong>
          <span className="muted"> · {nickname}</span>
          {serverPort != null ? (
            <span className="muted"> · nodo :{serverPort}</span>
          ) : null}
        </div>
        <div className="topbar-right">
          <span
            className={`pill ${status === "conectado" ? "ok" : "bad"}`}
            title="Estado del socket"
          >
            {status}
          </span>
          <button type="button" className="ghost" onClick={handleLeave}>
            Salir
          </button>
        </div>
      </header>

      {error ? <p className="banner err">{error}</p> : null}

      <main className="chat-layout">
        <ul className="msg-list" ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`msg ${m.type === "system" ? "system" : ""}`}
            >
              {m.type === "system" ? (
                <span className="system-text">{m.text}</span>
              ) : (
                <>
                  <span className="who">{m.user}</span>
                  <span className="body">{m.text}</span>
                </>
              )}
            </li>
          ))}
        </ul>

        <form className="composer" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Escribe un mensaje…"
            maxLength={2000}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Mensaje"
          />
          <button type="submit" disabled={!draft.trim()}>
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
