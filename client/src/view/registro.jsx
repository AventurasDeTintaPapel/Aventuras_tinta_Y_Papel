import React, { useState } from "react";
import { Button, Input } from "antd";

import imgRegistro from "../assets/img/imgRegistro.png";

export function Registro() {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [ingreContra, setIngreContra] = useState("");

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
        ingreContra,
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

  const onReset = () => {
    setNombre("");
    setApellido("");
    setNombreUsuario("");
    setEmail("");
    setFechaNacimiento("");
    setIngreContra("");
  };

  return (
    <>
      <div className="bg-black z-20 w-full h-[100vh] absolute opacity-40"></div>
      <img
        className="absolute z-10 h-full w-full"
        src={imgRegistro}
        alt="Imagen de registro"
      />

      <div className="bg-white rounded-md bg-opacity-90 w-[32vw] absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="pb-[2vw] pt-[1vw]">
          <p className="text-[1.8vw] font-bold text-center">REGISTRATE</p>
        </div>
        <div>
          <form className="space-y-[1vw] px-[2vw] pb-[1vw]" onSubmit={register}>
            <div className="grid grid-cols-2 gap-[1vw]">
              <div className="space-y-[0.8vw]">
                <label htmlFor="nombre" className=" text-[1.1vw] font-semibold">
                  Nombre
                </label>
                <Input
                  className="h-[2.5vw] text-[1.5vw]"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Roberto"
                  required
                  id="nombre"
                />
              </div>
              <div className=" space-y-[0.8vw]">
                <label
                  htmlFor="apellido"
                  className="text-[1.1vw] font-semibold"
                >
                  Apellido
                </label>
                <Input
                  className="h-[2.5vw] text-[1.5vw]"
                  required
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Espinoza"
                />
              </div>
            </div>

            <div className=" space-y-[0.8vw]">
              <label htmlFor="email" className=" text-[1.1vw] font-semiboldl">
                Email
              </label>
              <Input
                className="h-[2.5vw] text-[1.5vw]"
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@gmail.com"
              />
            </div>
            <div className=" space-y-[0.8vw]">
              <label
                htmlFor="fecha-nacimiento"
                className="text-[1.1vw] font-semiboldl"
              >
                Fecha de Nacimiento
              </label>
              <Input
                className="h-[2.5vw] text-[1.5vw]"
                required
                type="date"
                id="fecha-nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div className=" space-y-[0.8vw]">
              <label htmlFor="usuario" className="text-[1.1vw] font-semibold">
                Nombre de usuario
              </label>
              <Input
                className="h-[2.5vw] text-[1.5vw]"
                required
                id="usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Roberto_E"
              />
            </div>
            <div className=" space-y-[0.8vw]">
              <label
                htmlFor="contraseña"
                className="text-[1.1vw] font-semibold"
              >
                Contraseña
              </label>
              <Input
                required
                className="h-[2.5vw] text-[1.5vw]"
                type="password"
                id="contraseña"
                value={ingreContra}
                onChange={(e) => setIngreContra(e.target.value)}
                placeholder="#######"
              />
            </div>

            <div className="flex justify-center gap-[1vw]">
              <Button
                variant="solid"
                className="bg-purple-800 h-[3.5vw] text-white font-bold text-[1.6vw] w-[50%]"
                htmlType="button"
                onClick={onReset}
              >
                Reset
              </Button>
              <Button
                className="bg-purple-800 h-[3.5vw] text-white font-bold text-[1.6vw] w-[50%]"
                htmlType="submit"
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
