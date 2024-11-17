import React, { useEffect, useState, useRef } from "react";

import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

// boton iniciar sesion o cerrar secion
function IniciarSeccion() {
  const token = localStorage.getItem("token");

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  if (!token) {
    return (
      <Link to="/login" className="bg-white px-1 flex items-center rounded font-baloo text-[#602d7b] text-[11px]">
        Iniciar Sesión
      </Link>
    );
  } else {
    return (
      <button onClick={handleCerrarSesion} className=" border border-white px-1 flex items-center rounded font-baloo text-white text-[11px]">
        Cerrar sesion
      </button>
    );
  }
}

// boton adaptable
function HeaderMobilPc({ colAndrow }) {
  const [productos, setProductos] = useState([]);
  const [productoBuscador, setProductoBuscador] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 551);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  // funcion para el buscador
  const buscadorNavigate = async () => {
    try {
      if (!productoBuscador.trim()) return;

      navigate(`/catalogo?query=${productoBuscador}`);

      // Realiza la consulta
      const response = await axios.get(`http://localhost:3400/api/filters?query=${productoBuscador}`, {
        credentials: "include",
      });

      // Actualiza el estado de productos con los datos recibidos
      setProductos(response.data);
    } catch (error) {
      console.log("Error al traer los productos:", error);
    }

    if (!productos || productos.length === 0) {
      console.log("No hay el producto que está buscando");
      return;
    }
  };

  // funcion para desplegar el menu
  const handleClickMneu = () => {
    setMenu(!menu);
  };

  // escucha cuando la pagina cambia de taamaño para poder cambiar el diseño
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 551);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <HeaderMovil
          colAndrow={colAndrow}
          menu={menu}
          handleClickMneu={handleClickMneu}
          setProductoBuscador={setProductoBuscador}
          buscadorNavigate={buscadorNavigate}
        />
      ) : (
        <div>Escritorio: Diseño más completo</div>
      )}
    </div>
  );
}

// header para movil
function HeaderMovil({ menu, colAndrow, handleClickMneu, setProductoBuscador, buscadorNavigate }) {
  return (
    <header className={` ${colAndrow}`}>
      <div className="grid grid-rows-[auto_auto]  bg-gradient-to-r from-[#5A189A] via-[#7B2CBF] to-[#5A189A]">
        {/* header principal */}

        <div className="flex justify-between items-center pr-2">
          {/* Imagen */}
          <div className="contenedorImg w-28 h-auto">
            <img className="w-full h-full object-cover" src="../../src/assets/img/logo1-1.png" alt="Logo" />
          </div>

          {/* botones */}
          <div className="flex gap-2">
            <IniciarSeccion />
            <button onClick={handleClickMneu}>
              <IoMenu className="text-white text-xl" />
            </button>
          </div>
        </div>
        <div className={` ${menu ? "max-h-max opacity-100 mx-1  my-1" : " max-h-0 opacity-0 pointer-events-none"} bg-white `}>
          <div className="flex flex-col ">
            <BotonInfoUser />
            <BotonBuscador setProductoBuscador={setProductoBuscador} buscadorNavigate={buscadorNavigate} />
          </div>
        </div>
      </div>
    </header>
  );
}

// boton desplegable con informacion que puede acceder el usario
function BotonInfoUser() {
  const [perfilOnn, setPerfilOnn] = useState(false);

  const handleClickPerfil = () => {
    setPerfilOnn(!perfilOnn);
  };

  return (
    <>
      <button onClick={handleClickPerfil} className="gap-1 text-slate-700 flex p-1 text-[12px] font-baloo items-center">
        <span>Informacion de usuarios</span>
        <IoIosArrowDown />
      </button>
      <div
        className={` ${
          perfilOnn ? "opacity-100 max-h-max translate-y-0" : "max-h-0 opacity-0 pointer-events-none -translate-y-2"
        }  text-[11px] font-baloo text-slate-700`}
      >
        <Link to={"/perfil"} className="flex gap-2 border-t border-slate-200 items-center pl-3 py-1">
          <FaUserCircle />
          <span className="">Perfil</span>
        </Link>

        <Link to={"/carrito"} className="flex gap-2 border-t border-slate-200 items-center pl-3 py-1">
          <FaShoppingCart />
          <span className="">Carrito</span>
        </Link>

        <Link to={"/favoritos"} className="flex gap-2 border-t border-slate-200 items-center pl-3 py-1">
          <FaHeart />
          <span className="">Favoritos</span>
        </Link>

        <Link to={"/carrito"} className="flex gap-2 border-t border-slate-200 items-center pl-3 py-1">
          <IoBag />
          <span className="">Mis compras</span>
        </Link>

        <Link to={"/soporte"} className="flex gap-2 border-t border-slate-200 items-center pl-3 py-1">
          <FaHeadset />
          <span className="">Soporte al Cliente</span>
        </Link>
      </div>
    </>
  );
}

function BotonBuscador({ setProductoBuscador, buscadorNavigate }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [estiloBoton, setEstiloBoton] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 551);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 551);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const manejarClick = () => {
    const nuevoEstado = !mostrarMenu;
    setMostrarMenu(nuevoEstado);
    setEstiloBoton(
      nuevoEstado
        ? {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            backgroundColor: "#f0e6ef",
            marginRight: "1vw",
            paddingRight: "0.3vw",
            color: "#22075e",
          }
        : {}
    );
  };

  return isMobile ? (
    <div className="font-baloo text-[11px] border-t border-slate-300">
      <input className="w-full pl-1 py-1" placeholder="Buscador . . ." type="text" name="" id="" />
    </div>
  ) : (
    <div className="relative">
      <div
        className={`${
          mostrarMenu ? "opacity-100 translate-x-[1vw] w-[50vw]" : "opacity-0 w-0 translate-x-[3vw] pointer-events-none"
        } bg-white rounded-l-full flex items-center transition-all duration-500 ease-in-out py-[0.2vw] px-[0.25vw] h-[2.5vw] absolute right-[3.5vw]`}
      >
        <input
          className="rounded-l-full bg-gradient-to-r from-white to-purple-300 text-[1.1vw] text-purple-950 font-bold pl-[1vw] w-full h-[100%]"
          type="text"
          onChange={(e) => setProductoBuscador(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscadorNavigate();
            }
          }}
          placeholder="Buscar producto..."
        />
      </div>

      <button
        onClick={manejarClick}
        style={estiloBoton}
        className="flex items-center relative justify-center w-[2.5vw] h-[2.5vw] rounded-full bg-purple-700 text-white hover:text-[#22075e] hover:bg-[#f0e6ef] transition-all ease-in-out duration-500"
      >
        <FaSearch className="text-[1.4vw]" />
      </button>
    </div>
  );
}

// contenedor header
export function HeaderPruebas({ colAndrow }) {
  return <HeaderMobilPc />;
}
