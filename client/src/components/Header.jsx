// archivo: MiBoton.jsx (o el nombre que prefieras)
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaHeart, FaUser, FaUserCircle, FaQuestionCircle } from "react-icons/fa";

import { PiHandbagSimpleFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { Divider } from "antd";

export const direccionCerrarSesion = "../../html/inicio/inicioCambiado.html";

function iniciarSeccion() {
  const token = localStorage.getItem("token");
  const seccion = document.getElementById("seccion");

  if (seccion) {
    if (!token) {
      seccion.innerHTML = `
                <a href="http://localhost:5173/login">
                    <p class="usuariosOn">Iniciar Sesión</p>
                </a>
            `;
    } else {
      seccion.innerHTML = `
                <a href="${direccionCerrarSesion}">
                    <p class="usuariosOff">Cerrar Sesión</p>
                </a>
            `;

      // Agrega el evento de cierre de sesión
      const cerrarSesionLink = seccion.querySelector("a"); // Asume que el primer <a> es el de cerrar sesión
      if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          window.location.reload();
        });
      }
    }
  } else {
    console.error('El elemento con id="seccion" no fue encontrado.');
  }
}

const MyButton = () => {
  useEffect(() => {
    iniciarSeccion(); // Llama a la función al cargar el componente
  }, []);

  return (
    <button
      id="seccion"
      className="bg-purple-100 text-center rounded-lg font-medium border-r-[0.2vw] border-purple-950
        text-[1.25vw] 
        py-[2.5%] px-[0.6vw] 
        transition-all duration-300 ease-in-out hover:text-[1.35vw] text-purple-950 hover:bg-purple-50"
    >
      {/* El contenido se actualizará con `iniciarSeccion`, no es necesario incluirlo aquí */}
    </button>
  );
};

export default MyButton;

// contenedor header
export function Header() {
  return (
    <div
      className="flex justify-between items-center bg-purple-500
      py-[0.8vw] px-[1.5vw]"
    >
      {/* Imagen */}
      <div className="contenedorImg w-[12.5vw]">
        <img className="w-full h-full object-cover" src="../../src/assets/img/Aventuras__4_-removebg-preview2.png" alt="Logo" />
      </div>

      {/* buscador */}
      <div
        className="buscador bg-white rounded-full flex items-center relative
      
      /paddings/ 
      pl-[0.3vw] py-[0.3vw]
      
      /tamaños width y heigt/ 
      w-[50vw] h-[3.3vw] mb-[0.2vw]"
      >
        <input
          className="barradelBuscador rounded-full bg-purple-100 
          
          /tamaños de letras/ 
          text-[1.3vw] 
          font-bold 
          
          /paddings y margin/ 
          pl-[1vw]  
          
          /tamaños width y heigt/ 
          w-[90%] h-[100%]"
          type="text"
          placeholder="¿Qué desea buscar?"
        />

        {/* icono buscador */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fi-br-search absolute right-[0.4vw] top-[0.45vw] w-[2.5vw] border-r border-purple-800 rounded-full p-[0.4vw] transition-all ease-in-out duration-200 bg-purple-100 hover:w-[2.8vw] hover:top-[0.3vw]"
          >
            <g id="_01_align_center" data-name="01 align center">
              <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </g>
          </svg>
        </button>
      </div>

      {/* botones */}
      <div className="contendorBotone flex w-auto items-center justify-center xlprimario:gap-[1.5vw] xlsecundario:gap-[3vw]">
        {/* <BotonHeader nombreStiker={"fi-ss-user"} linkStiker={"#"} /> */}

        {/* Action buttons */}
        <div className="flex items-center space-x-[1.5vw]">
          <BotonPerfil />
          <BotonCarrito />

          <MyButton />
        </div>
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
    <div>
      <button
        ref={botonRef} // Referencia al botón
        onClick={() => {
          setMostrarSeccion(!mostrarSeccion);
          setEstiloBoton(
            mostrarSeccion
              ? {}
              : {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: "white",
                  marginTop: "20px",
                }
          );
        }}
        style={estiloBoton}
        className="flex items-center justify-center text-purple-950 bg-purple-100 w-[3.1vw] h-[3.1vw] rounded-full hover:bg-white transition-all ease-in-out duration-300"
      >
        <FaUser className="text-[1.5vw]" />
      </button>

      <div
        ref={menuRef} // Referencia al menú
        className={`${
          mostrarSeccion ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        } transition-all ease-in-out duration-200 text-[1.5vw] absolute z-20 shadow-xl bg-white w-[17.2vw] p-[1vw]`}
      >
        <div className="transition-all ease-in-out duration-300 hover:px-[1.2vw] ">
          <a className="flex items-center gap-[0.6vw] text-purple-950 font-semibold" href="#">
            <FaUserCircle className="text-[1.5vw]" />
            <span className="text-[1.3vw]">Perfil</span>
          </a>
        </div>
        <Divider />
        <div className="transition-all ease-in-out duration-300 hover:px-[1.2vw]">
          <a className="flex items-center gap-[0.6vw] text-purple-950 font-semibold" href="#">
            <FaHeart className="text-[1.5vw]" />
            <span className="text-[1.3vw]">Favoritos</span>
          </a>
        </div>
        <Divider />
        <div className="transition-all ease-in-out duration-300 hover:px-[1.2vw]">
          <a className="flex items-center gap-[0.6vw] text-purple-950 font-semibold" href="#">
            <PiHandbagSimpleFill className="text-[1.5vw]" />
            <span className="text-[1.3vw]">Mis compras</span>
          </a>
        </div>
        <Divider />
        <div className="transition-all ease-in-out duration-300 hover:px-[1.2vw]">
          <a className="flex items-center gap-[0.6vw] text-purple-950 font-semibold" href="#">
            <FaQuestionCircle className="text-[1.5vw]" />
            <span className="text-[1.3vw]">Soporte al Cliente</span>
          </a>
        </div>
        <Divider />
        <div className="transition-all ease-in-out duration-300 hover:px-[1.2vw]">
          <a className="flex items-center gap-[0.6vw] text-red-600 font-semibold" href="#">
            <MdCancel className="text-[1.5vw]" />
            <span className="text-[1.3vw]">Cerrar Sesión</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function BotonCarrito() {
  const [mostarTexto, setMostraText] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setMostraText(true)}
        onMouseLeave={() => setMostraText(false)}
        className=" flex items-center justify-center text-purple-950 bg-purple-100 w-[3.1vw] h-[3.1vw] rounded-full hover:bg-white"
      >
        <FaShoppingCart className="text-[1.5vw] mr-[0.1vw]" />
      </button>

      <div
        className={`${
          mostarTexto ? "opacity-60" : "opacity-0 pointer-events-none"
        } transition-all ease-in-out duration-[0.5s] absolute right-[10.9vw] bg-white mt-[5vw] rounded-[0.3vw] px-[0.8vw]`}
      >
        <p className="text-[0.8vw] font-semibold">CARRITO</p>
      </div>
    </>
  );
}
