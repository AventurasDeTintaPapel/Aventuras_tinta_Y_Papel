import React, { useState, useContext, createContext, useEffect } from "react";

// Crear un contexto para la sesión
const SessionContext = createContext({
  loading: true,
  usuario: null,
  setUsuario: () => {},
});

export const SessionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el token desde las cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Obtener el token de las cookies
  const token = getCookie("authToken"); // Se asume que el token está guardado en las cookies

  useEffect(() => {
    // Si existe un token en las cookies, intentamos obtener la información del usuario desde el backend
    if (token) {
      fetch("http://localhost:3400/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // Enviar el token en la cabecera
        },
        credentials: "include", // Esto permite enviar cookies de forma automática
      })
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error("No se pudo obtener la información del usuario");
          }
          return respuesta.json();
        })
        .then((data) => {
        console.log("soy yo", data);
          // Si la respuesta contiene datos del usuario, los establecemos
          setUsuario(data);
        })
        .catch((error) => {
          console.log("Error al obtener la sesión:", error);
          setUsuario(null); // Si hay error, establecemos el usuario como null
        })
        .finally(() => {
          setLoading(false); // Cambiar el estado de carga cuando termine la solicitud
        });
    } else {
      setLoading(false); // Si no hay token, ya no hace falta hacer la solicitud
    }
  }, [token]); // Solo vuelve a ejecutarse si el token cambia

  return (
    <SessionContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook para acceder a la sesión
export const useSession = () => useContext(SessionContext);
