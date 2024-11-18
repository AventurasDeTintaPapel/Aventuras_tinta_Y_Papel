import React, { useEffect } from "react";  
import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionProvider"; // Asegúrate de que la ruta sea correcta
import AdminPanel from "../pages/AdminPanel";

export const PrivateRoutes = () => {
  const { usuario, loading, setUsuario } = useSession(); // Asegúrate de que el contexto incluya un método para actualizar el usuario si es necesario

  useEffect(() => {
    // Si el usuario ya está cargado y no se actualiza correctamente, puedes hacer algo aquí
    if (!loading && usuario) {
      console.log("Usuario cargado:", usuario);
      console.log("Rol del usuario:", usuario ? usuario.rol : "No disponible");
    }
  }, [usuario, loading]); // El efecto se ejecuta cada vez que cambia el usuario o el estado de carga

  // Mostrar carga mientras se obtiene la información
  if (loading) {
    return <p>Loading...</p>;
  }

  // Verifica si el usuario existe y tiene rol de admin
  if (usuario && usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, muestra las rutas protegidas
  return <AdminPanel />;
};
