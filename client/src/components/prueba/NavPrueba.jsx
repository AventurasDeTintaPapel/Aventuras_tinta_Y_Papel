import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
// import { useSession } from "../context/SessionProvider";

export function NavPrueba({ colAndrow }) {
  // Intercambio desplegable
  function IntercambioMenu() {
    // const { usuario } = useSession()
    const [menu, setMenu] = useState(false);
    const [estiloFlecha, setEstiloFlecha] = useState({});

    const manejarClic = () => {
      setMenu(!menu);
      setEstiloFlecha(menu ? { transition: "transform 0.5s ease" } : { transform: "rotate(-180deg)", transition: "transform 0.5s ease" });
    };

    return (
      <div className="relative">
        <button onClick={manejarClic} className="flex justify-center items-center gap-1 py-1 text-[10px] sm:text-sm lg:text-base 2xl:text-2xl">
          <span className="">Intercambio</span>
          <IoIosArrowDown style={estiloFlecha} className="" />
        </button>
        <div
          className={` ${
            menu ? " max-h-max opacity-100 " : "opacity-0 pointer-events-none max-h-0 "
          } flex flex-col gap-2 py-1 absolute w-20 transition-all ease-linear duration-200 bg-purple-900 text-white text-[10px] sm:text-sm lg:text-base 2xl:text-2xl z-50`}
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

          {/* usuario.rol === "admin" && (
              <Link
              to={"/adminPanel"}
              className=" h-[3vw] flex pl-[1vw] items-center hover:bg-purple-800 hover:text-[1.6vw] transition-all ease-in-out duration-300"
            >
              Ver admin panel
            </Link>
            ) */}
        </div>
      </div>
    );
  }

  return (
    <nav className={`${colAndrow} font-baloo`}>
      <div className="bg-[#3C096C] h-auto items-end flex justify-evenly text-white">
        <Link to={"/"} className="flex justify-center py-1  items-center  text-[10px] sm:text-sm lg:text-base 2xl:text-2xl">
          <p>Inicio</p>
        </Link>
        <Link to={"/contactos"} className="flex py-1 justify-center items-center  text-[10px] sm:text-sm lg:text-base 2xl:text-2xl">
          <p>Contactos</p>
        </Link>
        <Link to={"/catalogo"} className="flex py-1 justify-center items-center  text-[10px] sm:text-sm lg:text-base 2xl:text-2xl">
          <p>Catalogo</p>
        </Link>

        <IntercambioMenu />
      </div>
    </nav>
  );
}
