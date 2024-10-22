import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

// Función para agregar a favoritos
const agregarAFavoritos = async (idProducto) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3400/api/favoritos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ idProducto }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(errorData.msg || "Error al agregar a favoritos");
    }

    const data = await response.json();
    console.log("Se agrego con exito a favoritos:", data.msg);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

const eliminarFavorito = async (idProd) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3400/api/favoritos/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ idProd }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(errorData.msg || "Error al eliminar de favoritos");
    }

    const data = await response.json();
    console.log("Se elimino con exito de favoritos:", data.msg);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export function MiComponenteFavorite({ array, estilos }) {
  const [agregado, setAgregado] = useState(false);

  const manejarClickAgregar = (id) => {
    setAgregado(!agregado);
    agregarAFavoritos(id);
  };

  const manejarClickEliminar = (id) => {
    setAgregado(!agregado);
    eliminarFavorito(id);
  };

  return (
    <div>
      {agregado
        ? array.map((producto) => (
            <button key={producto._id} onClick={() => manejarClickEliminar(producto._id)} className="absolute right-[1vw] top-[0.45vw] ">
              <FaHeart className={estilos} />
            </button>
          ))
        : array.map((producto) => (
            <button key={producto._id} onClick={() => manejarClickAgregar(producto._id)} className="absolute right-[1vw] top-[0.45vw] ">
              <FaRegHeart className={estilos} />
            </button>
          ))}
    </div>
  );
}

// carrusel inicio tarjetas
function Tarjeta({ imagen, titulo, precio }) {
  return (
    <div className="tarjetas bg-[#f6f9ff] flex flex-col items-center w-[17vw] pb-[0.5vw]">
      <div className="contentImg w-[15vw] h-[20.5vw]">
        <img className="w-full h-full" src="https://cordexizdesign.es/wp-content/uploads/2020/10/brujas_portada_predisenada.jpg" alt="" />
      </div>
      <div className="text-[#320c3a] flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
        <div class="w-[13vw]">
          <p class="truncate text-center text-[1.5vw]">Los Juicios De Salem - LA HISTORIA QUE NUNCA TE AN CONTADO</p>
        </div>
        <p className="precio text-[1.4vw]">Precio: $6000</p>
      </div>
      <div className="contentBotones w-full flex justify-evenly ">
        <button className="bg-[#6c6b90] text-white text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm">Favorito</button>
        <button className=" bg-[#6c6b90] text-white text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm">Comprar</button>
      </div>
    </div>
  );
}

const porcentajeDesplazamiento = 30; // 30% del ancho del contenedor
let intervalId = null;

export function Carruseltarjetas() {
  const contenedor2Ref = useRef(null);

  // Función para mover el contenedor en la dirección dada
  const moverContenedor = (contenedor, direccion) => {
    if (contenedor) {
      const desplazamiento = contenedor.clientWidth * porcentajeDesplazamiento;
      if (direccion === "derecha") {
        contenedor.scrollLeft += desplazamiento;
      } else if (direccion === "izquierda") {
        contenedor.scrollLeft -= desplazamiento;
      }
    }
  };

  // Función para iniciar el desplazamiento
  const iniciarDesplazamiento = (contenedor, direccion) => {
    if (intervalId === null) {
      intervalId = setInterval(() => moverContenedor(contenedor, direccion), 100);
    }
  };

  // Función para detener el desplazamiento
  const detenerDesplazamiento = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  return (
    <div>
      <div className="flex relative bg-[#fcf7f3] shadow-xl w-[76vw] justify-center py-[1vw]">
        <div
          ref={contenedor2Ref}
          id="contenedorTarjetas2"
          className="contenedorTarjetas gap-[1vw] py-[1vw] px-[1vw] bg-[#eeeaf4] flex w-[64.9vw] overflow-hidden"
          style={{ scrollBehavior: "smooth" }}
        >
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />

          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
        </div>

        {/* flecha Izquierda */}
        <button
          className="text-[2vw] absolute top-[17vw] right-[2vw]"
          onMouseDown={() => iniciarDesplazamiento(contenedor2Ref.current, "derecha")}
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
          onTouchStart={() => iniciarDesplazamiento(contenedor2Ref.current, "derecha")}
          onTouchEnd={detenerDesplazamiento}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fi-rs-angle-right right-[0.1vw] w-[3vw] z-10">
            <path
              d="M8.534,24l9.507-9.52a3.507,3.507,0,0,0,0-4.948L8.525,0,6.407,2.121,15.927,11.652a.5.5,0,0,1,0,.707L6.421,21.172Z"
              className="fill-[purple]"
            />
          </svg>
        </button>

        {/* flecha derecha */}
        <button
          className="text-[2vw] absolute top-[17vw] left-[2vw]"
          onMouseDown={() => iniciarDesplazamiento(contenedor2Ref.current, "izquierda")}
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
          onTouchStart={() => iniciarDesplazamiento(contenedor2Ref.current, "izquierda")}
          onTouchEnd={detenerDesplazamiento}
        >
          <svg className="fi-rs-angle-right left-[0.1vw] w-[3vw] z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M16.041,24,6.534,14.48a3.507,3.507,0,0,1,0-4.948L16.052,0,18.17,2.121,8.652,11.652a.5.5,0,0,0,0,.707l9.506,9.52Z"
              className="fill-[purple]"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

import img1 from "../assets/img/imgComics.png";
import img2 from "../assets/img/imgLirbos.png";
import img3 from "../assets/img/imgManga.png";

const Carrusel = () => {
  const items = [{ img: img1 }, { img: img2 }, { img: img3 }];

  return (
    <Carousel className="h-auto">
      {items.map((item, i) => (
        <Paper key={i}>
          <img src={item.img} className="h-[28vw] w-full" alt={`Imagen ${i + 1}`} />
        </Paper>
      ))}
    </Carousel>
  );
};

export default Carrusel;
