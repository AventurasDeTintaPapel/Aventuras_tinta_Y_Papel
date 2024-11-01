import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export function Nav({ colAndrow }) {
  const navigate = useNavigate();

  const handleTypeClick = (type) => {
    navigate(`/catalogo?query=${type}`);
  };

  function ProductosMenu() {
    const [mostrarMenu, setMostarMenu] = useState(false);
    const [estilo, setEstilo] = useState({});
    const [estiloFlecha, setEstiloFlecha] = useState({});

    const manejarClic = () => {
      setMostarMenu(!mostrarMenu);
      setEstilo(mostrarMenu ? {} : { backgroundColor: "#591899" });
      setEstiloFlecha(mostrarMenu ? { transition: "transform 0.5s ease" } : { transform: "rotate(-180deg)", transition: "transform 0.5s ease" });
    };

    return (
      <div className="relative">
        <button
          style={estilo}
          onClick={manejarClic}
          className="flex justify-center items-center h-[2.6vw] w-[10vw] hover:bg-[#5A189A] gap-[0.3vw] transition-all duration-200 ease-in rounded-t-[0.3vw]"
        >
          <span className="text-[1.35vw]">Productos</span>
          <IoIosArrowDown style={estiloFlecha} className="text-[1.35vw]" />
        </button>
        <div
          className={`${
            mostrarMenu ? " max-h-[15vw] opacity-100 " : "opacity-0 pointer-events-none max-h-0 "
          } flex flex-col absolute w-[10vw] transition-all ease-linear duration-200 bg-purple-900 text-white text-[1.4vw] z-50`}
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
    <nav className={`${colAndrow}`}>
      <div className="bg-[#3C096C] h-[3vw] items-end flex justify-evenly text-white">
        <Link
          to={"/"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Inicio
        </Link>
        <Link
          to={"/contactos"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Contactos
        </Link>
        <ProductosMenu />
        <Link
          to={"/intercambiar"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Intercambio
        </Link>
      </div>
    </nav>
  );
}
