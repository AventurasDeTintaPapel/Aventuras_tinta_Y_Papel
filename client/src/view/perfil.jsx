import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MdOutlineSquare } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import React, { useState } from "react";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import imgPerfilonn from "../assets/img/imgPerfil.png";

// baloo
import "@fontsource/baloo-2/700.css";
import { Nav } from "../components/Nav";

export function Perfil() {
  const token = localStorage.getItem("token");

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />

      <main className="row-start-3 relative">
        {token ? (
          <div
            className="flex justify-center items-center text-[#3C096C] py-[4vw] bg-[#f5e7e0]  h-full "
            style={{ fontFamily: "'Baloo 2', system-ui" }}
          >
            <div className=" h-[30vw] shadow-xl shadow-purple-300 w-[60vw] rounded-[1vw] bg-gradient-to-r from-purple-200 to-[#cfa8ea] flex flex-col py-[1.2vw] justify-between px-[2vw]">
              <p className="text-[2.5vw] font-bold ">PERFIL DE USARIO</p>
              <div className="ml-[1vw]">
                <div className=" flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
                  <p className="text-[1.4vw] font-medium">Nombre de Usario: </p>
                  <span className="text-[1.4vw] text-[#5A189A]">Axel Leger</span>
                </div>
                <div className=" flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
                  <p className="text-[1.4vw] font-medium">Correo Electronico: </p>
                  <span className="text-[1.4vw] text-[#5A189A]">axelleger2@gmail.com</span>
                </div>
                <div className=" flex gap-[0.5vw] h-[4.5vw] border-b-[0.1vw] border-purple-200 items-center">
                  <p className="text-[1.4vw] font-medium">Fecha de Nacimiento: </p>
                  <span className="text-[1.4vw] text-[#5A189A]">03-03-2005</span>
                </div>

                <TextModifier />
              </div>

              <Botonperfil />
            </div>
          </div>
        ) : (
          <>
            <img className="absolute top-0 left-0 h-full w-full opacity-80" src={imgPerfilonn} alt="" />
            <div className="items-center flex justify-center h-[100vh]">
              <div
                style={{ fontFamily: "'Baloo 2', system-ui" }}
                className="px-[3vw] py-[4vw] relative bg-opacity-90 bg-[#F2E9E4] flex items-center w-[80vw] h-[40vw] rounded-[1vw]"
              >
                <FaUser className="absolute left-[9.9vw]  text-[5vw] text-[#8e808b]" />
                <MdOutlineSquare className="absolute top-[12.6vw] left-[4.8vw] animate-spin-slow  text-[15vw] text-[#C9ADA7] mb-[0.5vw]  z-10" />
                <MdOutlineSquare className="absolute top-[11.1vw] left-[3.4vw] animate-spin-slow2 text-[18vw] text-[#9A8C98] mb-[0.5vw] z-0" />
                <div className="z-20 ml-[20vw]">
                  <p className="text-[3vw] text-[#22223B]">
                    <span className="text-[4vw]">I</span>NICIA SESION PARA PODER VER PERFIL
                  </p>
                  <div className="flex items-center gap-[1vw] ">
                    <a
                      href="http://localhost:5173/login"
                      className="px-[1vw] bg-[#5E548E] text-white text-[1.2vw] pb-[0.15vw] pt-[0.35vw] rounded-full "
                    >
                      INICIAR SESION
                    </a>
                    <a
                      href="http://localhost:5173/registro"
                      className="px-[1vw] bg-[#9F86C0] text-white text-[1.2vw] pb-[0.15vw] pt-[0.35vw] rounded-full  "
                    >
                      Registrate ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}

function Botonperfil() {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const manejarClick = () => {
    setMostrarMenu(true);
  };

  const cerrarForm = (e) => {
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

      <div className={`${mostrarMenu ? "opacity-60 bg-black" : "opacity-0 pointer-events-none"} absolute w-full h-full top-0 left-0 `}></div>
      <form
        className={`${
          mostrarMenu ? " opacity-100 " : "opacity-0 pointer-events-none "
        } bg-[#9453bd] text-white py-[1vw] px-[2vw] transition-all ease-in-out duration-500  absolute right-0 top-0 flex flex-col justify-around
        h-full`}
      >
        <p className="text-[2.3vw]">EDITAR INFORMACION</p>
        <div className="space-y-[1.5vw]">
          <div className="">
            <label htmlFor="" className="text-[1.5vw]">
              Nombre de usario:
            </label>
            <input className="w-full h-[2.4vw] text-[#240046] rounded-[0.3vw] text-[1.2vw] pl-[1vw]" type="text" />
          </div>
          <div className="">
            <label htmlFor="" className="text-[1.5vw]">
              Email:
            </label>
            <input className="w-full h-[2.4vw] text-[#240046] rounded-[0.3vw] text-[1.2vw] pl-[1vw]" type="email" />
          </div>
          <div className="">
            <label htmlFor="" className="text-[1.5vw]">
              Fecha de Nacimiento:
            </label>
            <input className="w-full h-[2.4vw] text-[#240046] rounded-[0.3vw] text-[1.2vw] pl-[1vw] pr-[0.5vw]" type="date" />
          </div>
          <div className="">
            <label htmlFor="" className="text-[1.5vw]">
              Constraseña:
            </label>
            <input className="w-full h-[2.4vw] text-[#240046] rounded-[0.3vw] text-[1.2vw] pl-[1vw]" type="password" />
          </div>
        </div>
        <button className="bg-[#732ab6] w-full text-[1.5vw] rounded-[0.3vw] py-[0.5vw] hover:text-[1.4vw] transition-all ease-in-out duration-200">
          EDITAR INFORMACION
        </button>
        <button onClick={cerrarForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[2.5vw] absolute top-[2.2vw] right-[1.7vw] hover:w-[2.8vw] transition-all ease-in-out duration-200 hover:translate-x-[0.2vw]"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
            ></path>
          </svg>
        </button>
      </form>
    </>
  );
}

const TextModifier = () => {
  const [text, setText] = useState("Contraseña123");
  const [isHashtags, setIsHashtags] = useState(true);

  // Función para alternar entre el texto original y hashtags
  const toggleText = () => {
    setIsHashtags(!isHashtags);
  };

  // Función para convertir el texto a hashtags
  const getHashtagText = () => {
    return text
      .split("")
      .map(() => "#")
      .join("");
  };

  return (
    <div className="flex gap-[0.5vw] h-[4.5vw] relative border-purple-200 items-center">
      <div className="flex gap-[0.7vw]">
        <p className="text-[1.4vw]">Contraseña:</p>
        <span className="text-[1.4vw] text-[#5A189A]">{isHashtags ? getHashtagText() : text}</span>
      </div>
      <button className="absolute right-[1vw] top-[1.5vw]" onClick={toggleText}>
        {isHashtags ? <IoEyeSharp className="text-[1.5vw]" /> : <BsEyeSlashFill className="text-[1.5vw]" />}
      </button>
    </div>
  );
};

export default TextModifier;
