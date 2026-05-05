import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

/**
 * Ruta pública: solo /login. El resto usa este componente en el padre
 * y redirige a /login si no hay sesión (comprobada con /api/auth/me).
 */
export default function SecureRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="centro">
        <p>Comprobando sesión…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
