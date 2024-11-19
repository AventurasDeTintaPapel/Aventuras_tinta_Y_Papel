import React, { useState } from "react";
import imglogin from "../assets/img/fondoLogin.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3400/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("soy yo", data);
      if (!response.ok) {
        // Manejo de error
        alert(data.msg || "Error al iniciar sesión");
        return;
      }

      // Guardar token en localStorage
    localStorage.setItem("token", data.token);

    // Acceder al rol correctamente desde el objeto usuario
    const rol = data.usuario?.rol;
    console.log("Rol del usuario:", rol);

    // Validar y redirigir según el rol
    if (rol === "admin") {
      console.log("Redirigiendo al panel de admin...");
      navigate("/adminPanel");
    } else {
      console.log("Redirigiendo al inicio...");
      navigate("/");
    }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      alert("Hubo un problema. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      {/* Fondo semitransparente y decorativo */}
      <div className="w-full h-[100vh] bg-black opacity-45 z-10 absolute"></div>
  
      {/* Imagen de fondo */}
      <img className="absolute z-0 w-[98%] h-[100vh] left-[1vw]" src={imglogin} alt="Imagen de login" />
  
      {/* Contenedor principal */}
      <div className="w-full h-[100vh] flex items-center justify-center">
        <form
          id="form"
          style={{ fontFamily: "'Baloo 2', system-ui" }}
          className="text-emerald-900 bg-opacity-80 bg-teal-50 w-[35vw] px-[2vw] py-[1vw] rounded-[0.6vw] z-20"
          onSubmit={login}
        >
          {/* Título */}
          <p className="text-[2.5vw] text-center font-bold">INGRESAR</p>
  
          {/* Campos del formulario */}
          <div className="space-y-[1vw] pb-[2vw]">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="text-[1.5vw] font-semibold ml-[0.2vw]">
                Email:
              </label>
              <input
                className="w-full pl-[0.7vw] text-[1.2vw] rounded-[0.3vw] py-[0.2vw] focus:border-[0.2vw] font-medium focus:border-emerald-800"
                type="email"
                id="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="text-[1.5vw] font-semibold ml-[0.2vw]">
                Contraseña:
              </label>
              <input
                className="w-full pl-[0.7vw] text-[1.2vw] rounded-[0.3vw] py-[0.2vw] focus:border-[0.2vw] font-medium focus:border-emerald-800"
                type="password"
                id="password"
                placeholder="#######"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
  
          {/* Botón de enviar */}
          <button
            type="submit"
            className="font-bold bg-emerald-900 rounded-[0.5vw] w-full text-white py-[0.7vw] text-[1.5vw] hover:text-[1.8vw] hover:bg-emerald-800 transition-all ease-in-out duration-200"
          >
            Entrar
          </button>
  
          {/* Opciones adicionales */}
          <div className="space-y-[0.2vw] mt-[1vw]">
            <div>
              <span className="text-[1.3vw]">¿No tienes cuenta? </span>
              <a
                className="text-emerald-500 text-[1.1vw]"
                href="http://localhost:5173/registro"
              >
                Regístrate
              </a>
            </div>
            <div>
              <span className="text-[1.3vw]">¿Olvidaste tu contraseña? </span>
              <a className="text-emerald-500 text-[1.1vw]" href="#">
                Click aquí
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}  
