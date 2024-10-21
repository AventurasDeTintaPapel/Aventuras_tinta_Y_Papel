import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/baloo-2/700.css";
import { IoIosArrowDown } from "react-icons/io";

// este es la etiqueta (a) sin despleable
function LiSinDesplegable({ textoNav, link }) {
  return (
    <button
      className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
    hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
    >
      <a href={link}>{textoNav}</a>
    </button>
  );
}

export function Nav({ colAndrow }) {
  const navigate = useNavigate();

  const handleTypeClick = (type) => {
    navigate(`/catalogo?query=${type}`);
  };

  function ProductosMenu() {
    const [mostrarMenu, setMostarMenu] = useState(false);
    const [estilo, setEstilo] = useState({});

    const manejarClic = () => {
      setMostarMenu(!mostrarMenu);
      setEstilo(mostrarMenu ? {} : { backgroundColor: "#5A189A" });
    };

    return (
      <div className="relative">
        <button
          style={estilo}
          onClick={manejarClic}
          className="flex justify-center items-center h-[2.6vw] w-[10vw] hover:bg-[#5A189A] transition-all duration-200 ease-in-out rounded-t-[0.3vw]"
        >
          <span className="text-[1.35vw]">Productos</span>
          <IoIosArrowDown className="text-[1.35vw]" />
        </button>
        <div
          className={`${
            mostrarMenu ? "opacity-90 translate-x-0" : "opacity-0 translate-y-[-1vw] pointer-events-none"
          } flex flex-col absolute w-[10vw] transition-all ease-in-out duration-200 bg-purple-900 text-white text-[1.4vw] z-50`}
        >
          <button
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            onClick={() => handleTypeClick("libros")}
          >
            Libros
          </button>
          <button
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            onClick={() => handleTypeClick("comics")}
          >
            Cómics
          </button>
          <button
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            onClick={() => handleTypeClick("mangas")}
          >
            Mangas
          </button>
          <button
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            onClick={() => handleTypeClick("mercancia")}
          >
            Mercancía
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav className={colAndrow} style={{ fontFamily: "'Baloo 2', system-ui" }}>
      <div className="bg-[#3C096C] h-[3vw] items-end flex justify-evenly text-white">
        <LiSinDesplegable textoNav={"Inicio"} link={"http://localhost:5173/inicio"} />
        <LiSinDesplegable textoNav={"Contactos"} link={"http://localhost:5173/contactos"} />
        <ProductosMenu />
        <LiSinDesplegable textoNav={"Vender"} link={"#"} />
        <LiSinDesplegable textoNav={"Mercancia"} link={"#"} />
      </div>
    </nav>
  );
}
