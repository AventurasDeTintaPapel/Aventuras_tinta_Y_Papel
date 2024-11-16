import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionProvider";

export const PrivateRoutes = () => {
  const { loading, usuario } = useSession(); // Obtiene usuario y estado de carga

  if (loading) {
    return <p>Loading...</p>
  }


  if (usuario.rol !== "admin") {

    // Si el usuario no tiene rol de admin, redirige al login o a otra ruta
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, muestra las rutas protegidas
  return <Outlet />;
};
