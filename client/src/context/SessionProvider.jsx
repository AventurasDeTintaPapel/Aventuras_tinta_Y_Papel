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
      console.log("Información del usuario obtenida:", data);

      // Establecer los datos del usuario en el estado
      setUsuario(data);
    } catch (error) {
      console.log("Error al obtener la sesión:", error);
      setUsuario(null); // Establecer usuario como null si falla la solicitud
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <SessionContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook para acceder a la sesión
export const useSession = () => {
  return useContext(SessionContext);
};
