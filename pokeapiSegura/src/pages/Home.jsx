import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PAGE = 20;

function spriteIdFromUrl(pokemonUrl) {
  const m = /\/pokemon\/(\d+)\//.exec(pokemonUrl);
  if (m) return m[1];
  return null;
}

function spriteFor(pokemonUrl) {
  const id = spriteIdFromUrl(pokemonUrl);
  if (id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
}

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/pokemon?offset=${offset}&limit=${PAGE}`, {
          credentials: "include"
        });
        if (res.status === 401) {
          setError("Sesión requerida");
          return;
        }
        if (!res.ok) throw new Error("No se pudo cargar la lista");
        const j = await res.json();
        if (!cancelled) setData(j);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error de red");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [offset]);

  if (loading && !data) {
    return <p className="centro">Cargando Pokémon…</p>;
  }

  if (error) {
    return <p className="error card">{error}</p>;
  }

  return (
    <div>
      <h1>Inicio</h1>
      <p className="card">Listado vía PokeAPI (ruta protegida; la sesión se guarda con cookie httpOnly en el servidor).</p>
      <ul className="pokemon-grid" style={{ marginTop: "1rem" }}>
        {data?.results?.map((p) => {
          const id = spriteIdFromUrl(p.url);
          return (
            <li key={p.url}>
              <Link to={id ? `/detalles/${id}` : `/detalles/${p.name}`}>
                <div className="img-wrap">
                  <img
                    src={spriteFor(p.url)}
                    width="96"
                    height="96"
                    alt=""
                    loading="lazy"
                  />
                </div>
                {p.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="pagination">
        <button type="button" disabled={offset === 0 || loading} onClick={() => setOffset(0)}>
          Inicio
        </button>
        <button
          type="button"
          disabled={!data?.previous || loading}
          onClick={() => setOffset((o) => Math.max(0, o - PAGE))}
        >
          Anterior
        </button>
        <span>Offset {offset}</span>
        <button
          type="button"
          disabled={!data?.next || loading}
          onClick={() => setOffset((o) => o + PAGE)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
