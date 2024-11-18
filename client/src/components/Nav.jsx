import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from "../context/SessionProvider";

export function Nav({ colAndrow }) {
  function IntercambioMenu() {
    // const { usuario } = useSession()
    const [menu, setMenu] = useState(false);
    const [estilo, setEstilo] = useState({});
    const [estiloFlecha, setEstiloFlecha] = useState({});

    const manejarClic = () => {
      setMenu(!menu);
      setEstilo(menu ? {} : { backgroundColor: "#591899" });
      setEstiloFlecha(menu ? { transition: "transform 0.5s ease" } : { transform: "rotate(-180deg)", transition: "transform 0.5s ease" });
    };

    return (
      <div className="relative">
        <button
          style={estilo}
          onClick={manejarClic}
          className="flex justify-center items-center h-[2.6vw] w-[10vw] hover:bg-[#5A189A] gap-[0.3vw] transition-all duration-200 ease-in rounded-t-[0.3vw]"
        >
          <span className="text-[1.35vw]">Intercambio</span>
          <IoIosArrowDown style={estiloFlecha} className="text-[1.35vw]" />
        </button>
        <div
          className={` ${
            menu ? " max-h-[15vw] opacity-100 " : "opacity-0 pointer-events-none max-h-0 "
          } flex flex-col absolute w-[12vw] transition-all ease-linear duration-200 bg-purple-900 text-white text-[1.4vw] z-50`}
        >
          <Link
            to={"/intercambiar"}
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
          >
            Publicar
          </Link>
          <Link
            to={"/listado"}
            className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
          >
            Ver produtos
          </Link>

          {/* {usuario.rol === "admin" && (
              <Link
              to={"/adminPanel"}
              className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            >
              Ver admin panel
            </Link>
            ) } */}
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
        <Link
          to={"/catalogo"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Catalogo
        </Link>

        <IntercambioMenu />
      </div>
    </nav>
  );
}
