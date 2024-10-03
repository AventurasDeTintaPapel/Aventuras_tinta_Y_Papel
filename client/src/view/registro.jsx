import React, { useState } from "react";

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

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="w-[40vw] flex flex-col bg-emerald-100" id="form" onSubmit={register}>
        <p>REGISTRATE</p>

        <div className="form-container">
          <div className="">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input required type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Roberto" />
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input required type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Espinoza" />
          </div>
          <div className="">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@gmail.com" />
          </div>
          <div className="">
            <label htmlFor="fecha-nacimiento" className="form-label">
              Fecha de nacimiento
            </label>
            <input
              required
              type="date"
              className="object-fit-xl-contain border rounded"
              id="fecha-nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="usuario" className="form-label">
              Nombre de usuario
            </label>
            <input
              required
              type="text"
              id="usuario"
              className="usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Roberto_E"
            />
          </div>

          <div className="">
            <label htmlFor="contraseña" className="form-label">
              Contraseña
            </label>
            <input type="password" id="contraseña" value={ingreContra} onChange={(e) => setIngreContra(e.target.value)} placeholder="#######" />
          </div>

          <div id="passwordHelpBlock" className="form-text texto">
            Su contraseña debe tener entre 8 y 20 caracteres.
          </div>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
}
