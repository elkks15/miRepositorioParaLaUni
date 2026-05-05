import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Detalles() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let c = false;
    (async () => {
      setP(null);
      setErr("");
      const res = await fetch(`/api/pokemon/${encodeURIComponent(id)}`, { credentials: "include" });
      if (res.status === 401) {
        setErr("Sesión requerida");
        return;
      }
      if (res.status === 404) {
        setErr("Pokémon no encontrado");
        return;
      }
      if (!res.ok) {
        setErr("Error al cargar");
        return;
      }
      const j = await res.json();
      if (!c) setP(j);
    })();
    return () => {
      c = true;
    };
  }, [id]);

  if (err) {
    return (
      <div>
        <p className="error">{err}</p>
        <Link to="/home">Volver al listado</Link>
      </div>
    );
  }
  if (!p) {
    return <p>Cargando…</p>;
  }

  const img = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default;
  return (
    <div className="card">
      <h1>Detalles: {p.name}</h1>
      <p>#{p.id}</p>
      {img && (
        <div className="img-wrap">
          <img src={img} width={200} height={200} alt={p.name} />
        </div>
      )}
      <h2>Tipos</h2>
      <p>
        {p.types?.map((t) => (
          <span key={t.type.name} className="badge">
            {t.type.name}
          </span>
        ))}
      </p>
      <h2>Estadísticas</h2>
      <ul>
        {p.stats?.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>
      <p>
        <Link to="/home">Volver a inicio</Link>
        {" · "}
        <Link to="/filtrar">Buscar por nombre</Link>
      </p>
    </div>
  );
}
