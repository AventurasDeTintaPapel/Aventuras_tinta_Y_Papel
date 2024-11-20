import React, { useState, useEffect } from "react";
import imgPerfilonn from "../assets/img/imgPerfil.png";

export default function Perfil() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos del usuario
  const fetchUserData = () => {
    if (token) {
      fetch("http://localhost:3400/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Datos del usuario recibidos:", data);
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Llama la función al montar el componente
    fetchUserData();
  }, []);

  return (
    <main className="row-start-3 relative flex justify-center items-center text-[#3C096C] py-[4vw] bg-[#f5e7e0] h-full ">
      {loading ? (
        <p>Cargando...</p>
      ) : token && userData ? (
        <div className="h-[30vw] shadow-xl shadow-purple-300 w-[60vw] rounded-[1vw] bg-gradient-to-r from-purple-200 to-[#cfa8ea] flex flex-col py-[1.2vw] justify-between px-[2vw]">
          <p className="text-[2.5vw] font-bold">PERFIL DE USUARIO</p>
          <div className="ml-[1vw]">
            <div className="flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
              <p className="text-[1.4vw] font-medium">Nombre de Usuario: </p>
              <span className="text-[1.4vw] text-[#5A189A]">{userData.nombreUsuario}</span>
            </div>
            <div className="flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
              <p className="text-[1.4vw] font-medium">Correo Electrónico: </p>
              <span className="text-[1.4vw] text-[#5A189A]">{userData.email}</span>
            </div>
            <div className="flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
              <p className="text-[1.4vw] font-medium">Fecha de Nacimiento: </p>
              <span className="text-[1.4vw] text-[#5A189A]">{userData.fechaNacimiento}</span>
            </div>
            <div className="flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
              <p className="text-[1.4vw] font-medium">Numero de Telefono: </p>
              <span className="text-[1.4vw] text-[#5A189A]">{userData.phone}</span>
            </div>
          </div>
          <Botonperfil fetchUserData={fetchUserData} />
        </div>
      ) : (
        <img className="absolute top-0 left-0 h-full w-full opacity-80" src={imgPerfilonn} alt="" />
      )}
    </main>
  );
}

function Botonperfil({ fetchUserData }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Estados para manejar los datos del usuario
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setfechaNacimiento] = useState("");
  const [phone, setPhone] = useState("");

  // Función para cargar los datos del perfil desde el servidor
  const cargarDatosPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No se encontró el token de autenticación.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3400/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al cargar los datos del usuario.");
      }
      fetchUserData();

      const data = await response.json();
      setnombreUsuario(data.nombreUsuario || "");
      setEmail(data.email || "");
      setfechaNacimiento(data.fechaNacimiento || "");
      setPhone(data.phone || "");
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
    }
  };

  // Abrir el formulario de edición y cargar los datos actuales
  const manejarClick = async () => {
    setMostrarMenu(true);
    await cargarDatosPerfil();
  };

  // Cerrar el formulario
  const cerrarForm = () => {
    setMostrarMenu(false);
  };

  // Confirmar la alerta
  const confirmarAlerta = async () => {
    setMostrarAlerta(false);
    await cargarDatosPerfil(); // Recargar datos actualizados después de la alerta
    setMostrarMenu(false); // Cierra el formulario
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No se encontró el token de autenticación.");
      return;
    }

    const datosUsuario = {
      nombreUsuario,
      email,
      fechaNacimiento,
      phone,
    };

    try {
      const response = await fetch("http://localhost:3400/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        credentials: "include",
        body: JSON.stringify(datosUsuario),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario.");
      }

      console.log("Usuario actualizado correctamente.");
      setMostrarAlerta(true); // Mostrar alerta de éxito
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <>
      <button
        onClick={manejarClick}
        className="bg-[#53187e] text-white rounded-[0.7vw] hover:text-[1.7vw] transition-all ease-in-out duration-200 py-[0.5vw] text-[1.5vw]"
      >
        EDITAR INFORMACION
      </button>

      {mostrarMenu && (
        <>
          <div className="opacity-60 bg-black absolute w-full h-full top-0 left-0"></div>

          <form
            onSubmit={manejarEnvio}
            className="bg-[#9453bd] text-black py-[1vw] px-[2vw] transition-all ease-in-out duration-500 absolute right-0 top-0 flex flex-col justify-around h-full"
          >
            <p className="text-[2.3vw]">EDITAR INFORMACION</p>

            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setnombreUsuario(e.target.value)}
              className="text-[1.2vw] py-[0.3vw] mb-[1vw] rounded-[0.3vw]"
            />

            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[1.2vw] py-[0.3vw] mb-[1vw] rounded-[0.3vw]"
            />

            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setfechaNacimiento(e.target.value)}
              className="text-[1.2vw] py-[0.3vw] mb-[1vw] rounded-[0.3vw]"
            />

            <label htmlFor="phone">Número de Teléfono:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-[1.2vw] py-[0.3vw] mb-[1vw] rounded-[0.3vw]"
            />

            <button
              type="submit"
              className="bg-[#732ab6] w-full text-[1.5vw] rounded-[0.3vw] py-[0.5vw] hover:text-[1.4vw] transition-all ease-in-out duration-200"
            >
              GUARDAR CAMBIOS
            </button>

            <button onClick={cerrarForm} className="text-[1.5vw] mt-[1vw]" type="button">
              Cerrar
            </button>
          </form>
        </>
      )}

      {mostrarAlerta && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Perfil actualizado correctamente</p>
            <button onClick={confirmarAlerta} className="bg-[#53187e] text-white rounded py-2 px-4 hover:bg-[#732ab6]">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
