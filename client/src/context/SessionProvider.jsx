import React, { useState, useContext, createContext, useEffect } from "react";

const SessionContext = createContext({
  user: null,
  loading: true,
});

export const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null: sin sesión
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    // Llamada para obtener el usuario actual
    fetch("http://localhost:3400/api/auth/me", {
      credentials: "include", // Incluye cookies
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la sesión");
        }
        return respuesta.json();
      })
      .then((data) => {
        setUsuario(data.usuario || null); // Si no hay usuario, establece null
      })
      .catch((error) => {
        console.log("Error al obtener la sesión:", error);
        setUsuario(null); // Sin sesión en caso de error
      })
      .finally(() => {
        setLoading(false); // Termina el estado de carga
      });
  }, []);

  return (
    <SessionContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
