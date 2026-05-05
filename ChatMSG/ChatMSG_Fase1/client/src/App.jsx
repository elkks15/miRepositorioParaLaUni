import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || window.location.origin;

export default function App() {
  const [nickname, setNickname] = useState("");
  const [joined, setJoined] = useState(false);
  const [inputNick, setInputNick] = useState("");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("desconectado");
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const socketRef = useRef(null);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (!joined) return;

    const socket = io(SOCKET_URL, {
      auth: { username: nickname },
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
      setError(payload?.message || "Autenticación rechazada.");
      setJoined(false);
    });

    socket.on("history", ({ messages: hist }) => {
      setMessages(hist ?? []);
    });

    socket.on("message:new", ({ message }) => {
      if (message) appendMessage(message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [joined, nickname, appendMessage]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const canJoin = useMemo(() => inputNick.trim().length > 0, [inputNick]);

  function handleJoin(e) {
    e.preventDefault();
    const name = inputNick.trim();
    if (!name || name.length > 32) {
      setError("El nombre debe tener entre 1 y 32 caracteres.");
      return;
    }
    setError("");
    setNickname(name);
    setJoined(true);
  }

  function handleSend(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !socketRef.current) return;
    socketRef.current.emit("chat:send", { text });
    setDraft("");
  }

  function handleLeave() {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setJoined(false);
    setMessages([]);
    setNickname("");
    setInputNick("");
    setStatus("desconectado");
  }

  if (!joined) {
    return (
      <div className="shell">
        <div className="card join-card">
          <h1>ChatMSG — Fase 1</h1>
          <p className="muted">
            Sin persistencia ni cookies: todo vive en memoria en el servidor.
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
