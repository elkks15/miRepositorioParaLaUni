import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Filtrar() {
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [buscando, setBuscando] = useState(false);
  const navigate = useNavigate();

  async function buscar(e) {
    e.preventDefault();
    setErr("");
    const t = String(q).trim();
    if (!t) {
      setErr("Escribe un nombre de Pokémon (en inglés, p. ej. pikachu, bulbasaur).");
      return;
    }
    setBuscando(true);
    try {
      const res = await fetch(`/api/pokemon/search/${encodeURIComponent(t.toLowerCase())}`, {
        credentials: "include"
      });
      if (res.status === 401) {
        setErr("Sesión requerida");
        return;
      }
      if (res.status === 404) {
        setErr("Pokémon no encontrado. Prueba el nombre en inglés.");
        return;
      }
      if (!res.ok) throw new Error("Error al buscar");
      const p = await res.json();
      navigate(`/detalles/${p.id}`, { replace: false });
    } catch (e) {
      setErr(e.message || "Error de red");
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div>
      <h1>Filtrar / buscar</h1>
      <p className="card">
        La búsqueda de PokeAPI es por <strong>nombre exacto en inglés</strong> (por ejemplo,{" "}
        <em>pikachu</em>).
      </p>
      <form className="form-stack card" style={{ marginTop: "1rem" }} onSubmit={buscar}>
        <label className="block" htmlFor="f">
          Nombre en inglés
        </label>
        <input
          id="f"
          name="f"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. charizard"
        />
        {err && <p className="error">{err}</p>}
        <button type="submit" disabled={buscando}>
          {buscando ? "Buscando…" : "Ver detalles"}
        </button>
      </form>
      <p className="block">
        <Link to="/home">Volver a inicio</Link>
      </p>
    </div>
  );
}
