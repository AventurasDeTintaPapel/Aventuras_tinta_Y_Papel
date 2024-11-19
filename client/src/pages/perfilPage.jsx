import React, { useState, useEffect } from "react"; 
import { MdOutlineSquare } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import imgPerfilonn from "../assets/img/imgPerfil.png";

export default function Perfil() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHashtags, setIsHashtags] = useState(true);

  useEffect(() => {
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
          console.log("Datos del usuario recibidos:", data); // Revisa los datos
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
  }, [token]);

  const toggleText = () => {
    setIsHashtags(!isHashtags);
  };

  const getHashtagText = (text) => {
    // Verifica si 'text' está definido antes de intentar usar .split()
    return (text || "").split("").map(() => "#").join("");
  };

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
          <Botonperfil />
        </div>
      ) : (
        <img
          className="absolute top-0 left-0 h-full w-full opacity-80"
          src={imgPerfilonn}
          alt=""
        />
      )}
    </main>
  );
}

function Botonperfil() {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const manejarClick = () => {
    setMostrarMenu(true);
  };

  const cerrarForm = () => {
    setMostrarMenu(false);
  };

  return (
    <>
      <button
        onClick={manejarClick}
        className="bg-[#53187e] text-white rounded-[0.7vw] hover:text-[1.7vw] transition-all ease-in-out duration-200 py-[0.5vw] text-[1.5vw]"
      >
        EDITAR INFORMACION
      </button>

      <div
        className={`${
          mostrarMenu ? "opacity-60 bg-black" : "opacity-0 pointer-events-none"
        } absolute w-full h-full top-0 left-0`}></div>
      <form
        className={`${
          mostrarMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        } bg-[#9453bd] text-white py-[1vw] px-[2vw] transition-all ease-in-out duration-500 absolute right-0 top-0 flex flex-col justify-around h-full`}
      >
        <p className="text-[2.3vw]">EDITAR INFORMACION</p>
        {/* Formulario aquí */}
        <button className="bg-[#732ab6] w-full text-[1.5vw] rounded-[0.3vw] py-[0.5vw] hover:text-[1.4vw] transition-all ease-in-out duration-200">
          EDITAR INFORMACION
        </button>
        <button onClick={cerrarForm}>Cerrar</button>
      </form>
    </>
  );
}
