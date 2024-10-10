import React, { useState } from "react";
import imgRegistro from "../assets/img/imgREGISTRO.png";
import "@fontsource/baloo-2/700.css";

export function Registro() {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");

  // Funcion para registrarse
  const register = async (e) => {
    // Evitamos el evento submit.
    e.preventDefault();

    // Realizamos la petición a nuestro servidor.
    const peticion = await fetch("http://localhost:3400/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        nombre,
        apellido,
        nombreUsuario,
        email,
        fechaNacimiento,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la petición, mostrar el mensaje de error.
    if (!peticion.ok) {
      alert(respuesta.msg);
    } else {
      // Caso contrario, mostramos el mensaje.
      alert(respuesta.msg);
      // Redirigimos al usuario al login.
      window.location.href = "http://localhost:5173/login";
    }
  };

  return (
    <>
      <div className="flex justify-center absolute items-center h-[100vh] w-full z-30">
        <form
          style={{ fontFamily: "'Baloo 2', system-ui" }}
          className="bg-orange-50 p-[1.5vw] bg-opacity-75 w-[45vw] flex flex-col gap-[2vw] rounded-[1vw]"
          onSubmit={register}
        >
          {/* titulo */}
          <p className="text-[2.5vw] font-bold text-center">REGISTRATE</p>

          {/* preguntas */}
          <div className="flex flex-col gap-[1vw]">
            <div className="grid grid-cols-2 gap-[1vw]">
              <div>
                <label htmlFor="nombre" className=" text-[1.3vw] ml-[0.4vw] font-semibold">
                  Nombre
                </label>
                <input
                  className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Roberto"
                  required
                  id="nombre"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="text-[1.3vw] ml-[0.4vw] font-semibold">
                  Apellido
                </label>
                <input
                  className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                  required
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Espinoza"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className=" text-[1.3vw] ml-[0.4vw] font-semiboldl">
                Email
              </label>
              <input
                className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="fecha-nacimiento" className="text-[1.3vw] ml-[0.4vw] font-semiboldl">
                Fecha de Nacimiento
              </label>
              <input
                className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                required
                type="date"
                id="fecha-nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="usuario" className="text-[1.3vw] ml-[0.4vw] font-semibold">
                Nombre de usuario
              </label>
              <input
                className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                required
                id="usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Roberto_E"
              />
            </div>
            <div>
              <label htmlFor="contraseña" className="text-[1.3vw] ml-[0.4vw] font-semibold">
                Contraseña
              </label>
              <input
                required
                className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                type="password"
                id="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="#######"
              />
            </div>
          </div>

          {/* boton enviar */}
          <div className="">
            <button
              className="bg-red-900 h-[3.5vw] text-white font-bold text-[1.6vw] rounded-[0.3vw] w-full hover:bg-red-800 hover:text-[1.8vw] transition-all ease-linear duration-150 "
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className="bg-black w-full h-[100vh] absolute  opacity-40 z-20"></div>

      <img className=" h-full w-full absolute z-10" src={imgRegistro} />
    </>
  );
}
