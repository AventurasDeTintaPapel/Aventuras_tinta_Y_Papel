import React, { useState, useContext, createContext, useEffect } from "react";
import Cookies from "js-cookie"; // Importar la librería de cookies

const SessionContext = createContext({
  usuario: null,
  loading: true,
});

export const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null: sin sesión
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    // Llamada para obtener el usuario actual
    fetch("http://localhost:3400/api/auth/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include", // Esto es lo correcto para enviar cookies
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la sesión");
        }
        return respuesta.json();
      })
      .then((data) => {
        const usuarioRecibido = data.usuario || null;
        setUsuario(usuarioRecibido); // Establecer el usuario
        // Si hay usuario, lo guardamos en las cookies (expira en 7 días)
        if (usuarioRecibido) {
          Cookies.set("authToken", JSON.stringify(usuarioRecibido), {
            expires: 7,
          });
        } else {
          Cookies.remove("usuario"); // Si no hay usuario, eliminamos la cookie
        }
      })
      .catch((error) => {
        console.log("Error al obtener la sesión:", error);
        setUsuario(null); // Sin sesión en caso de error
        Cookies.remove("usuario"); // Eliminar la cookie si hay error
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
