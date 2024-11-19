import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductosMenu() {
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <div className="relative">
      <button
        className={`flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] 
          transition-all duration-200 ease-in-out rounded-t-[0.3vw] text-[1.35vw] ${menu ? "bg-[#5A189A] text-white font-bold" : ""}`}
        onClick={handleClick}
      >
        Productos
      </button>
      <div className={` ${menu ? "opacity-100 " : " opacity-0 pointer-events-none"} font-poopins absolute bg-purple-900 z-50 flex flex-col w-[15vw]`}>
        <Link to={"/productosAdmin"} className="text-[1.2vw] p-[0.5vw] hover:bg-[#5A189A]">
          Ver Productos
        </Link>
        <Link to={"/adminPanel"} className=" text-[1.2vw] p-[0.5vw] hover:bg-[#5A189A]">
          Administrar Productos
        </Link>
      </div>
    </div>
  );
}

export function NavAdmin({ colAndrow }) {
  return (
    <nav className={`${colAndrow}`}>
      <div className="bg-[#3C096C] font-poopins h-[3vw] items-end flex justify-evenly text-white">
        <Link
          to={"/inicioAdmin"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Inicio
        </Link>
        <ProductosMenu />
        <Link
          to={"/adminProveedores"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Proveedores
        </Link>
        <Link
          to={"/adminPedidos"}
          className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] hover:bg-[#5A189A] transition-all duration-200 ease-in-out hover:font-bold  rounded-t-[0.3vw] text-[1.35vw]"
        >
          Pedidos
        </Link>
      </div>
    </nav>
  );
}
