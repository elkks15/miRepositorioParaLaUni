import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, loading } = useAuth();
  const from = location.state?.from?.pathname || "/home";

  if (loading) {
    return <div className="centro">Cargando…</div>;
  }

  if (user) {
    return (
      <div className="centro">
        <p>Ya has iniciado sesión.</p>
        <button type="button" onClick={() => navigate("/home", { replace: true })}>
          Ir a inicio
        </button>
      </div>
    );
  }

  async function handleLogin(e) {
    e?.preventDefault?.();
    setError("");
    const r = await signIn(username, password);
    if (r.ok) {
      navigate(from, { replace: true });
    } else {
      setError(r.error);
    }
  }

  return (
    <div className="centro">
      <h1>Acceso</h1>
      <p>
        Solo esta ruta es pública. Usuario demo: <code>admin</code> / <code>1234</code>
      </p>
      <form className="card form-stack" onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
        <div>
          <label className="block" htmlFor="user">
            Usuario
          </label>
          <input
            id="user"
            name="user"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="pass">
            Contraseña
          </label>
          <input
            id="pass"
            name="pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
