import "@fontsource/montserrat/700.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { IconoLibros, IconoManga, IconoMercancia } from "./icons";
import { useNavigate } from "react-router-dom";

// este es la etiqueta (a) sin despleable
function LiSinDesplegable({ textoNav, id, link }) {
  return (
    <li
      id={id}
      className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
    hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.3vw]"
    >
      <a href={link}>{textoNav}</a>
    </li>
  );
}

// esta es las partes de la (lista) que se desplegan
// function AlistaNav({ textoLista, id, link }) {
//   return (
//     <a href={link}>
//       <p
//         id={id}
//         className="group-hover:font-bold group-hover:text-[1.7vw] relative flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] text-[1.5vw] rounded-t-[0.5vw] group-hover:bg-purple-700"
//       >
//         {textoLista}
//       </p>
//     </a>
//   );
// }

// categorias
// function HoverNav({ texto, linkHover }) {
//   return (
//     <a href={linkHover}>
//       <div
//         className={`transition-all ease-in-out duration-200 py-[0.2vw] border-b-[0.1vw] border-purple-400

//         /tamaño letra/
//         text-[1.5vw]

//         /tamaño/
//         w-[15vw]

//         /hover/
//       hover:bg-purple-800 hover:font-bold
//         hover:text-[1.75vw]`}
//       >
//         {texto}
//       </div>
//     </a>
//   );
// }

// contenedor navegador

export function Nav({ colAndrow }) {
  return (
    <nav className={colAndrow} style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <ul className="flex bg-[#3C096C] h-[3.1vw] text-white justify-evenly items-end font-medium pt-[0.7vw] border-b-[0.2vw] border-[#9D4EDD]">
        {/* Incio  */}
        <LiSinDesplegable textoNav={"Inicio"} id={"inicioNav"} link={"http://localhost:5173/inicio"} />

        {/* contacto Principal */}
        <LiSinDesplegable textoNav={"Contactos"} id={"contactoNav"} link={"http://localhost:5173/contactos"} />

        <BotonProductos />

        {/* vender */}
        <LiSinDesplegable textoNav={"Vender"} id={"VenderNav"} link={"http://localhost:5173/html/productos/#"} />

        {/* intercambio  */}
        <LiSinDesplegable textoNav={"Intercambio"} id={"IntercamioNav"} link={"http://localhost:5173/html/productos/#"} />
      </ul>
    </nav>
  );
}

// boton productos

function BotonProductos() {
  const [mostrarMenu, serMostrarMenu] = useState(false);
  const [styleBoton, setStyleBoton] = useState({});
  const [angulo, setAngulo] = useState(0);
  const menuRef = useRef(null);
  const botonRef = useRef(null);

  const rotar = () => {
    setAngulo(angulo + 180); // Cambia este valor para rotar más o menos grados
  };

  function manejarClick() {
    const nuevoEstado = !mostrarMenu;
    serMostrarMenu(nuevoEstado);
    setStyleBoton(
      mostrarMenu
        ? {}
        : {
            backgroundColor: "rgba(123, 43, 191, 0.6)",
          }
    );
  }

  useEffect(() => {
    function clickAfuera(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && !botonRef.current.contains(event.target)) {
        serMostrarMenu(false);
        setStyleBoton({});
      }
    }
    document.addEventListener("mousedown", clickAfuera);
    return () => {
      document.removeEventListener("mousedown", clickAfuera);
    };
  }, [menuRef, botonRef]);

  const navigate = useNavigate();

  const handleRedirect = (categoria) => {
    navigate(`/catalogo/${categoria}`);
  };

  return (
    <div className="relative">
      <button
        ref={botonRef}
        style={styleBoton}
        onClick={() => {
          manejarClick(), rotar();
        }}
        className="flex justify-center transition-all ease-linear duration-150 items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] text-[1.3vw] rounded-t-[0.3vw] hover:bg-[#5A189A] gap-[0.5vw]"
      >
        <span>Productos</span>
        <IoIosArrowDown style={{ transform: `rotate(${angulo}deg)` }} />
      </button>
      <ul
        ref={menuRef}
        className={`${
          mostrarMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-1vw]"
        } bg-[#9D4EDD] absolute w-[13vw] top-auto z-50 transition-all ease-in-out duration-300`}
      >
        <li
          onClick={() => handleRedirect("libros")}
          className="hover:bg-[#b465f1] group h-[3vw] flex items-center pl-[0.5vw] gap-[0.5vw] text-[1.2vw] border-b-[0.1vw] border-[#C77DFF]"
        >
          <IconoLibros />
          <span className="transition-all ease-linear duration-200 text-[1.4vw] group-hover:text-[1.6vw]">Libros</span>
        </li>
        <li
          onClick={() => handleRedirect("mangas")}
          className="hover:bg-[#b465f1] group h-[3vw] flex items-center pl-[0.5vw] gap-[0.5vw] text-[1.2vw] border-b-[0.1vw] border-[#C77DFF]"
        >
          <IconoManga />
          <span className="transition-all ease-in-out duration-200 text-[1.4vw] group-hover:text-[1.6vw]">Mangas</span>
        </li>
        <li
          onClick={() => handleRedirect("comics")}
          className="hover:bg-[#b465f1] group h-[3vw] flex items-center pl-[0.6vw] gap-[0.6vw] text-[1.2vw] border-b-[0.1vw] border-[#C77DFF]"
        >
          <FaCommentAlt className="transition-all ease-in-out duration-200 text-[1vw] mt-[0.1vw] group-hover:text-[1.2vw]" />
          <span className="transition-all ease-in-out duration-200 text-[1.4vw] group-hover:text-[1.6vw]">Comics</span>
        </li>
        <li
          onClick={() => handleRedirect("mercancia")}
          className="hover:bg-[#b465f1] group h-[3vw] flex items-center pl-[0.5vw] gap-[0.5vw] text-[1.2vw]"
        >
          <IconoMercancia />
          <span className="transition-all ease-in-out duration-200 text-[1.4vw] group-hover:text-[1.6vw]">Mercancia</span>
        </li>
      </ul>
    </div>
  );
}
