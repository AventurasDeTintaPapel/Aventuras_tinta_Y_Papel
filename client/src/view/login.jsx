import React, { useState } from "react";
import imglogin from "../assets/img/fondoLogin.png";
import "@fontsource/baloo-2/700.css";

export function Login() {
  // Estados para los campos del formulario y el estado de éxito
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // Función para iniciar sesión
  const login = async (e) => {
    e.preventDefault();

    // Realizamos la petición a nuestro servidor.
    const peticion = await fetch("http://localhost:3400/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log("Petición realizada:", peticion);

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la petición, mostrar el mensaje de error.
    if (!peticion.ok) {
      alert(respuesta.msg);
    } else {
      // Caso contrario mostrar el mensaje de éxito.
      alert(respuesta.msg);

      // Seteamos el token en el localStorage.
      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("role", respuesta.role);

      // Redirecciones según el rol
      if (respuesta.role === "admin") {
        window.location.href = "http://127.0.0.1:5500/client/inicio/inicioAdmin.html";
      } else if (respuesta.role === "user") {
        window.location.href = "/client/html/inicio/inicio.html";
      } else {
        window.location.href = "http://localhost:5173/inicio";
      }
    }
  };

  return (
    <>
      <div className=" w-full h-[100vh] bg-black opacity-45 z-10 absolute"></div>

      <img className="absolute z-0 w-[98%] h-[100vh] left-[1vw]" src={imglogin} alt="" />

      <div className="w-full h-[100vh] flex items-center justify-center">
        <form
          id="form"
          style={{ fontFamily: "'Baloo 2', system-ui" }}
          className="text-emerald-900 bg-opacity-80 bg-teal-50 w-[35vw] px-[2vw] py-[1vw] rounded-[0.6vw] z-20"
          onSubmit={login}
        >
          <p className="text-[2.5vw] text-center font-bold">INGRESAR</p>

          <div className="space-y-[1vw] pb-[2vw] ">
            <div className="">
              <label htmlFor="usuario" className="text-[1.5vw] font-semibold ml-[0.2vw]">
                Email:
              </label>
              <input
                className="w-full pl-[0.7vw] text-[1.2vw] rounded-[0.3vw] py-[0.2vw] focus:border-[0.2vw] font-medium focus:border-emerald-800"
                type="text"
                id="usuario"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="">
              <label htmlFor="contraseña" className="text-[1.5vw] font-semibold ml-[0.2vw]">
                Contraseña:
              </label>
              <input
                className="w-full pl-[0.7vw] text-[1.2vw] rounded-[0.3vw] py-[0.2vw] focus:border-[0.2vw] font-medium focus:border-emerald-800"
                type="password"
                id="contraseña"
                placeholder="#######"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="font-bold bg-emerald-900 rounded-[0.5vw] w-full text-white py-[0.7vw] text-[1.5vw] hover:text-[1.8vw] hover:bg-emerald-800 transition-all ease-in-out duration-200"
          >
            Entrar
          </button>

          <div className="space-y-[0.2vw] mt-[1vw]">
            <div>
              <span className="text-[1.3vw]">¿No tienes cuenta? </span>
              <a className="text-emerald-500  text-[1.1vw]" href="http://localhost:5173/registro">
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
