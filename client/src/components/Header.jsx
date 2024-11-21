import React, { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import "@fontsource/montserrat/700.css";
import { IconoCerrarSesion, IconoFvoritos, IconoMisCompras, IconoPerfil, IconoSoporteAlCliente } from "./icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../context/SessionProvider";

const MyButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay token en localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Actualizar estado basado en la existencia del token
  }, []);

  const handleCerrarSesion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3400/api/auth/logout",
        {},
        { withCredentials: true } // Incluir cookies
      );

      // Eliminar token y cookies relacionadas
      localStorage.removeItem("token");
      document.cookie = "authToken=; Max-Age=0; path=/";

      // Actualizar estado
      setIsLoggedIn(false);

      // Redirigir al usuario a la página de inicio
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo.");
    }
  };

  // Render basado en el estado
  return (
    <div className="font-poopins">
      {isLoggedIn ? (
        <button
          onClick={handleCerrarSesion}
          className=" tracking-wider font-bold px-[1vw] py-[0.4vw] rounded border-[0.14vw] text-[1vw] text-white border-white hover:scale-105 transition ease-in-out duration-200"
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link to={"/login"} className="tracking-wider text-[#3b096b] font-bold px-[1vw] py-[0.4vw] rounded text-[1vw] bg-white ">
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}


// boton perfil
function BotonPerfil() {
  const [mostrarSeccion, setMostrarSeccion] = useState(false);
  const [estiloBoton, setEstiloBoton] = useState({});
  const menuRef = useRef(null); // Referencia al menú
  const botonRef = useRef(null); // Referencia al botón

  // Efecto para cerrar el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      // Verificar si el clic es fuera del menú y fuera del botón
      if (menuRef.current && !menuRef.current.contains(event.target) && !botonRef.current.contains(event.target)) {
        setMostrarSeccion(false); // Cierra el menú
        setEstiloBoton({});
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, botonRef]);

  const token = localStorage.getItem("token");

  return (
    <div className="relative">
      <button
        ref={botonRef}
        onClick={() => {
          setMostrarSeccion(!mostrarSeccion);
          setEstiloBoton(
            mostrarSeccion
              ? {}
              : {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: "#f0e6ef",
                  marginTop: "1vw",
                  color: "#22075e",
                }
          );
        }}
        style={estiloBoton}
        className="flex items-center relative justify-center w-[2.5vw] h-[2.5vw] hover:text-[#22075e] text-white rounded-full hover:bg-[#f0e6ef] transition-all ease-in-out duration-500"
      >
        <FaUser className="text-[1.3vw]" />
      </button>

      <div
        id="menuDesplegable"
        ref={menuRef} // Referencia al menú
        className={`${
          mostrarSeccion ? "opacity-100 max-h-[20vw]" : "opacity-0 max-h-0 pointer-events-none"
        } transition-all ease-in-out duration-300 text-[1.5vw] absolute z-50 shadow-xl bg-[#f0e6ef] rounded-tl-[0.5vw] rounded-b-[0.5vw] w-[18vw] right-[0vw]`}
      >
        <BotonesSessionOnn />
      </div>
    </div>
  );
}

// botones del boton perfil
function BotonesSessionOnn() {
  return (
    <>
      <Link
        to={"/perfil"}
        className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950 transition-all ease-in-out group duration-300 border-b-[0.1vw] border-purple-200"
      >
        <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Perfil</span>
        <IconoPerfil />
      </Link>

      <div className="transition-all ease-in-out group duration-300 border-b-[0.1vw] border-purple-200">
        <a className="flex items-center h-[3.8vw] pr-[1vw] gap-[0.6vw] justify-end text-purple-950" href="http://localhost:5173/favoritos">
          <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.5vw]">Favoritos</span>
          <IconoFvoritos />
        </a>
      </div>

      <div className="transition-all ease-in-out duration-300 rounded-b-[0.5vw] border-b-[0.1vw] border-purple-200 group ">
        <a className="flex items-center h-[3.8vw] gap-[0.8vw] pr-[1vw] justify-end text-purple-950" href="http://localhost:5173/soporte">
          <span className="text-[1.3vw] transition-all duration-300 ease-in-out group-hover:text-[1.4vw]">Soporte al Cliente</span>
          <IconoSoporteAlCliente />
        </a>
      </div>
    </>
  );
}

function BotonBuscador({ setProductoBuscador, buscadorNavigate }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [estiloBoton, setEstiloBoton] = useState({});

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

  return (
    <div className="relative">
      <div
        className={`${
          mostrarMenu ? "opacity-100 translate-x-[1vw] w-[50vw]" : "opacity-0 w-0 translate-x-[3vw]  pointer-events-none"
        } bg-white rounded-l-full flex items-center transition-all duration-500 ease-in-out py-[0.2vw] px-[0.25vw] h-[2.5vw] absolute right-[3.5vw]`}
      >
        <input
          className=" rounded-l-full bg-gradient-to-r from-white to-purple-300 text-[1.1vw] text-purple-950 font-bold pl-[1vw] w-full h-[100%]"
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
export function Header({ colAndrow }) {
  const [productos, setProductos] = useState([]);
  const [productoBuscador, setProductoBuscador] = useState("");
  const { usuario, logout } = useSession();
  const navigate = useNavigate();

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

  return (
    <header className={colAndrow}>
      <div
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        className="row-start-1 col-span-2 flex justify-between items-center bg-gradient-to-r from-[#5A189A] via-[#7B2CBF] to-[#5A189A] px-[1.5vw]"
      >
        {/* Imagen */}
        <div className="contenedorImg w-[15vw] h-[6vw]">
          <img className="w-full h-full object-cover" src="../../src/assets/img/logo1-1.png" alt="Logo" />
        </div>
     

        <div className=" justify-center flex items-center gap-[1.5vw] br">
          {/* buscador */}
         
          <BotonPerfil />
          <a
            href="http://localhost:5173/carrito"
            className=" cursor-pointer flex items-center relative justify-center w-[2.5vw] h-[2.5vw] hover:text-[#22075e] text-white rounded-full hover:bg-[#f0e6ef] transition-all ease-in-out duration-500"
          >
            <IoCart className="text-[1.6vw] mr-[0.1vw]" />
          </a>

          <MyButton />
        </div>
      </div>
    </header>
  );
}
