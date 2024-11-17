import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionProvider"; // Asegúrate de que la ruta sea correcta

export const PrivateRoutes = () => {
  const { usuario, loading } = useSession(); // Usar el contexto de sesión para obtener el usuario y el estado de carga

  // Mostrar carga mientras se obtiene la información
  if (loading) {
    return <p>Loading...</p>;
  }

  // Si no hay usuario o no tiene rol de admin, redirige al login
  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, muestra las rutas protegidas
  return <Outlet />;
};
