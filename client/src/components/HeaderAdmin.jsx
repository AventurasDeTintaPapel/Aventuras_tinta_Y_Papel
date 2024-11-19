import React, { useEffect, useState } from "react";
import "@fontsource/montserrat/700.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay token en localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Actualizar estado basado en la existencia del token
  }, []);

  const handleCerrarSesion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3400/api/auth/logout",
        {},
        { withCredentials: true } // Incluir cookies
      );

      // Eliminar token y cookies relacionadas
      localStorage.removeItem("token");
      document.cookie = "authToken=; Max-Age=0; path=/";

      // Actualizar estado
      setIsLoggedIn(false);

      // Redirigir al usuario a la página de inicio
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo.");
    }
  };

  // Render basado en el estado
  return (
    <div className="font-poopins">
      {isLoggedIn ? (
        <button
          onClick={handleCerrarSesion}
          className=" tracking-wider font-bold px-[1vw] py-[0.4vw] rounded border-[0.14vw] text-[1vw] text-white border-white hover:scale-105 transition ease-in-out duration-200"
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link to={"/login"} className="tracking-wider text-[#3b096b] font-bold px-[1vw] py-[0.4vw] rounded text-[1vw] bg-white ">
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}

// contenedor header
export function HeaderAdmin({ colAndrow }) {
  return (
    <header className={colAndrow}>
      <div
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        className="row-start-1 col-span-2 flex justify-between items-center bg-gradient-to-r from-[#5A189A] via-[#7B2CBF] to-[#5A189A] px-[1.5vw]"
      >
        {/* Imagen */}
        <div className="contenedorImg w-[15vw] h-[6vw]">
          <img className="w-full h-full object-cover" src="../../src/assets/img/logo1-1.png" alt="Logo" />
        </div>

        <MyButton />
      </div>
    </header>
  );
}
