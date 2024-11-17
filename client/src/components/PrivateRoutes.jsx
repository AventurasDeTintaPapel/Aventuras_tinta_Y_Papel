import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionProvider"; // Asegúrate de que la ruta sea correcta
import AdminPanel from "../pages/AdminPanel";

export const PrivateRoutes = () => {
  const { usuario, loading } = useSession(); // Usar el contexto de sesión para obtener el usuario y el estado de carga

  console.log("Cargando usuario:", loading); // Verifica si se está cargando el usuario
  console.log("Usuario cargado:", usuario);  // Verifica si el usuario está siendo cargado
  console.log("Rol del usuario:", usuario ? usuario.rol : "No disponible");

  // Mostrar carga mientras se obtiene la información
  if (loading) {
    return <p>Loading...</p>;
  }


// Si no hay usuario o no tiene rol de admin, redirige al login
  if (usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, muestra las rutas protegidas
  return <AdminPanel/>
};
