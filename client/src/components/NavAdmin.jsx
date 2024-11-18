import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from "../context/SessionProvider";

export function NavAdmin({ colAndrow }) {
  return (
    <nav className={`${colAndrow}`}>
      <div className="bg-[#3C096C] h-[3vw] items-end flex justify-evenly text-white">
        <Link
          to={"/inicioAdmin"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Inicio
        </Link>
        <Link
          to={"/adminPanel"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Productos
        </Link>
        <Link
          to={"/adminProveedores"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Proveedores
        </Link>
        <Link
          to={"/adminPedidos"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
//     hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Pedidos
        </Link>
      </div>
    </nav>
  );
}
