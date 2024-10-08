import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaQuestionCircle, FaUser, FaUserCircle } from "react-icons/fa";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { IoCart } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import "@fontsource/montserrat/700.css";

function cerrarSesion() {
  const token = localStorage.getItem("token");
  const menu = document.getElementById("menuDesplegable"); // Asegúrate de que este ID sea correcto

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (token) {
    // Verifica si el elemento de cerrar sesión ya existe
    const cerrarSesionDiv = document.getElementById("cerrarSesionDiv");

    // Si no existe, crearlo
    if (!cerrarSesionDiv) {
      const newDiv = document.createElement("div");
      newDiv.id = "cerrarSesionDiv"; // Establece un ID para poder verificarlo después
      newDiv.className = "transition-all ease-in-out duration-300 rounded-b-[0.5vw] group text-red-600";
      newDiv.innerHTML = `
        <a  class="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-red-700" href="#" id="cerrarSesionLink">
          <span class="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Cerrar Sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[1.8vw] transition-all duration-300 group-hover:w-[2vw]">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
          </svg>
        </a>
      `;
      menu.appendChild(newDiv); // Agrega el nuevo elemento al menú

      if (cerrarSesionDiv) {
        menu.className += "right-[10vw]";
      }

      // Agregar el event listener después de agregar el HTML
      const cerrarSesionLink = document.getElementById("cerrarSesionLink");
      if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener("click", handleCerrarSesion);
      }
    }
  }
}

function iniciarSeccion() {
  const token = localStorage.getItem("token");
  const seccion = document.getElementById("seccion");

  if (seccion) {
    if (!token) {
      seccion.innerHTML = `
      <a href="http://localhost:5173/login">
      <button  class="bg-purple-100 flex items-center justify-center rounded-[0.3vw] px-[0.5vw] h-[2.5vw] font-medium border-r-[0.2vw] border-purple-950
        text-[1.1vw] transition-all duration-300 ease-in-out hover:text-[1.2vw] text-purple-950 hover:bg-purple-50">
                    Iniciar Sesión
                    </button>
                    </a>
            `;
    } else {
      console.log("la session ya fue iniciada");
      cerrarSesion();
    }
  }
}

const MyButton = () => {
  useEffect(() => {
    iniciarSeccion(); // Llama a la función al cargar el componente
  }, []);

  return <div id="seccion"></div>;
};

// contenedor header
export function Header() {
  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="row-start-1 col-span-2 flex justify-between items-center bg-gradient-to-r from-[#4c2e84] via-[#722ed1] to-[#4f279a] py-[0.8vw] px-[1.5vw]"
    >
      {/* Imagen */}
      <div className="contenedorImg w-[10vw]">
        <img className="w-full h-full object-cover" src="../../src/assets/img/logo.png" alt="Logo" />
      </div>

      <div className=" justify-center flex items-center gap-[1.5vw]">
        {/* buscador */}
        <div
          className="buscador bg-white rounded-full flex items-center relative
      
      /paddings/ 
      py-[0.2vw] px-[0.25vw] mb-[0.2vw]
      
      /tamaños width y heigt/ 
      w-[60vw] h-[2.5vw]"
        >
          <input
            className="barradelBuscador rounded-full bg-gradient-to-r from-white to-purple-300
          
          /tamaños de letras/ 
          text-[1.1vw] text-purple-950
          font-bold
          
          /paddings y margin/ 
          pl-[1vw] 
          
          /tamaños width y heigt/ 
          w-full h-[100%]"
            type="text"
            placeholder="Search product"
          />

          {/* icono buscador */}
          <button className="absolute right-[0.8vw] top-[0.5vw]">
            <IoSearch className=" text-purple-950 text-[1.4vw]" />
          </button>
        </div>

        {/* botones */}
        {/* <BotonHeader nombreStiker={"fi-ss-user"} linkStiker={"#"} /> */}

        <BotonPerfil />

        <a
          href="http://localhost:5173/carrito"
          className=" cursor-pointer flex items-center relative justify-center w-[2.5vw] h-[2.5vw] hover:text-[#22075e] text-white rounded-full
         hover:bg-white transition-all ease-in-out duration-500"
        >
          <IoCart className="text-[1.6vw] mr-[0.1vw]" />
        </a>

        <MyButton />
      </div>
    </div>
  );
}

function BotonPerfil() {
  const [mostrarSeccion, setMostrarSeccion] = useState(false);
  const [estiloBoton, setEstiloBoton] = useState({});
  const menuRef = useRef(null); // Referencia al menú
  const botonRef = useRef(null); // Referencia al botón

  // Efecto para cerrar el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      // Verificar si el clic es fuera del menú y fuera del botón
      if (menuRef.current && !menuRef.current.contains(event.target) && !botonRef.current.contains(event.target)) {
        setMostrarSeccion(false); // Cierra el menú
        setEstiloBoton({}); // Resetea el estilo del botón
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, botonRef]);

  return (
    <div className="relative">
      <button
        ref={botonRef}
        onClick={() => {
          setMostrarSeccion(!mostrarSeccion);
          setEstiloBoton(
            mostrarSeccion
              ? {}
              : {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: "white",
                  marginTop: "3vw",
                  color: "#22075e",
                }
          );
        }}
        style={estiloBoton}
        className="flex items-center relative justify-center w-[2.5vw] h-[2.5vw] hover:text-[#22075e] text-white rounded-full
         hover:bg-white transition-all ease-in-out duration-500"
      >
        <FaUser className="text-[1.3vw]" />
      </button>

      <div
        id="menuDesplegable"
        ref={menuRef} // Referencia al menú
        className={`${
          mostrarSeccion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-2vw]  pointer-events-none"
        } transition-all ease-in-out duration-500 text-[1.5vw] absolute z-50 shadow-xl bg-white rounded-tl-[0.5vw] rounded-b-[0.5vw] w-[17vw] right-[0vw]`}
      >
        <div className="flex flex-col  gap-[1vw] items-center justify-center py-[1vw]  relative ">
          <div className="w-[96%] rounded-tl-[0.5vw] absolute h-[66%] bg-gradient-to-b from-purple-500 to-purple-900 top-[0.3vw]  z-0"></div>
          <div className="absolute w-[6.5vw] h-[10.2vw] rounded-b-full bg-gradient-to-b from-purple-500 to-purple-900  z-20 top-[0.3vw]"></div>

          <p className="text-center z-20 text-white">Axel Leger</p>
          <div className="w-[6vw] z-20">
            <img className="w-full h-full rounded-full " src="https://i.pinimg.com/736x/62/87/26/62872606328a29ace159c2e03926b4df.jpg" alt="" />
          </div>
        </div>

        <div className="transition-all ease-in-out group duration-300 border-b-[0.1vw] border-purple-200">
          <a className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950" href="http://localhost:5173/perfil">
            <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Perfil</span>
            <FaUserCircle className="text-[1.5vw] transition-all duration-300 ease-in-out group-hover:text-[1.8vw]" />
          </a>
        </div>

        <div className="transition-all ease-in-out group duration-300 border-b-[0.1vw] border-purple-200">
          <a className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950" href="#">
            <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Favoritos</span>
            <FaHeart className="text-[1.5vw] transition-all duration-300 ease-in-out group-hover:text-[1.8vw]" />
          </a>
        </div>

        <div className="transition-all ease-in-out duration-300 group border-b-[0.1vw] border-purple-200">
          <a className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950" href="#">
            <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Mis compras</span>
            <PiHandbagSimpleFill className="text-[1.5vw] justify-center transition-all duration-300 ease-in-out group-hover:text-[1.8vw]" />
          </a>
        </div>

        <div className="transition-all ease-in-out duration-300 rounded-b-[0.5vw] border-b-[0.1vw] border-purple-200 group ">
          <a className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950" href="#">
            <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.4vw]">Soporte al Cliente</span>
            <FaQuestionCircle className="text-[1.5vw] transition-all duration-300 ease-in-out group-hover:text-[1.7vw]" />
          </a>
        </div>
      </div>
    </div>
  );
}
