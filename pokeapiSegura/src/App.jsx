import { Routes, Route, Navigate, Link, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import SecureRoute from "./SecureRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Detalles from "./pages/Detalles.jsx";
import Filtrar from "./pages/Filtrar.jsx";

function ConCabecera() {
  const { user, logout } = useAuth();
  return (
    <div className="app-shell">
      <header className="topbar">
        <strong>PokéApp (cookie httpOnly)</strong>
        {user && (
          <nav>
            <Link to="/home">Inicio</Link>
            <Link to="/filtrar">Filtrar</Link>
            <span>{user.username}</span>
            <button type="button" className="ghost" onClick={() => logout()}>
              Cerrar sesión
            </button>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function Rutas() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<SecureRoute />}>
        <Route element={<ConCabecera />}>
          <Route path="/home" element={<Home />} />
          <Route path="/detalles/:id" element={<Detalles />} />
          <Route path="/filtrar" element={<Filtrar />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Rutas />
    </AuthProvider>
  );
}
