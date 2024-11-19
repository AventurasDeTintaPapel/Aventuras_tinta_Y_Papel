import React, { useState, useEffect, createContext, useContext } from "react";

// Crear un contexto para la sesión
const SessionContext = createContext({
  loading: true,
  usuario: null,
  setUsuario: () => {},
});

// Proveedor de la sesión
export const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener la información del usuario desde el backend
  const fetchUsuario = async () => {
    try {
      const respuesta = await fetch("http://localhost:3400/api/auth/user", {
        method: "GET",
        credentials: "include", // Enviar cookies automáticamente
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }

      const data = await respuesta.json();
      console.log("datos del usuario:", data);
      setUsuario(data); // Actualiza el estado global con los datos del usuario
    } catch (error) {
      console.log("Error al obtener la sesión:", error);
      setUsuario(null); // Establecer usuario como null si falla la solicitud
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Este `useEffect` se ejecuta solo cuando el componente se monta para verificar el estado de la sesión.
  useEffect(() => {
    fetchUsuario();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para cerrar sesión, se actualizará el estado global y eliminará cookies.
  const logout = () => {
    setUsuario(null); // Limpiar el usuario en el contexto
    localStorage.removeItem("token"); // Eliminar token de localStorage
    document.cookie = "authToken=; Max-Age=0; path=/"; // Eliminar cookie
  };

  return (
    <SessionContext.Provider value={{ usuario, setUsuario, loading, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook para acceder a la sesión
export const useSession = () => {
  return useContext(SessionContext);
};
