import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from "../context/SessionProvider";

export function Nav({ colAndrow }) {
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
          to={"/"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Productos
        </Link>
        <Link
          to={"/"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          aventuras
        </Link>

        <Link
          to={"/contactos"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          pedidos
        </Link>
        <Link
          to={"/catalogo"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          proveedores
        </Link>

        <IntercambioMenu />
      </div>
    </nav>
  );
}
