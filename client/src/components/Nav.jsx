import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiar useHistory por useNavigate

// este es la etiqueta (a) sin despleable
function LiSinDesplegable({ textoNav, link }) {
  return (
    <button
      className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
    hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.3vw]"
    >
      <a href={link}>{textoNav}</a>
    </button>
  );
}

export function Nav({ colAndrow }) {
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleTypeClick = (type) => {
    navigate(`/catalogo?query=${type}`); // Usar navigate para cambiar de ruta
  };

  function ProductosMenu() {
    const [mostrarMenu, setMostarMenu] = useState(false);

    const manejarClic = () => {
      setMostarMenu(!mostrarMenu);
    };

    return (
      <div className="relative">
        <button
          onClick={manejarClic}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold rounded-t-[0.3vw] text-[1.3vw]"
        >
          Productos
        </button>
        <div
          className={`${
            mostrarMenu ? "opacity-90 text-black" : "opacity-0 pointer-events-none"
          } flex flex-col absolute w-[10vw] bg-purple-900 text-white text-[1.4vw]`}
        >
          <button className="" onClick={() => handleTypeClick("libros")}>
            Libros
          </button>
          <button className="" onClick={() => handleTypeClick("comics")}>
            Cómics
          </button>
          <button className="" onClick={() => handleTypeClick("mangas")}>
            Mangas
          </button>
          <button className="" onClick={() => handleTypeClick("mercancia")}>
            Mercancía
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav className={colAndrow}>
      <div className="bg-[#3C096C]">
        <div className="flex justify-evenly text-white">
          <LiSinDesplegable textoNav={"Inicio"} link={"http://localhost:5173/inicio"} />
          <LiSinDesplegable textoNav={"Contactos"} link={"http://localhost:5173/contactos"} />
          <ProductosMenu />
          <LiSinDesplegable textoNav={"Vender"} link={"#"} />
          <LiSinDesplegable textoNav={"Mercancia"} link={"#"} />
        </div>
      </div>
    </nav>
  );
}
