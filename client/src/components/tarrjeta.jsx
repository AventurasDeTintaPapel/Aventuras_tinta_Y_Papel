import { useRef, React } from "react";
import { Carousel } from "antd";

function Tarjeta({ imagen, titulo, precio }) {
  return (
    <div className="tarjetas bg-slate-300 flex flex-col items-center w-[17vw] h-[32.5vw]">
      <div className="contentImg w-[15vw] h-[20.5vw] bg-slate-400 p-[0.5vw]">
        <img
          className="w-full h-full"
          src="https://cordexizdesign.es/wp-content/uploads/2020/10/brujas_portada_predisenada.jpg"
          alt=""
        />
      </div>
      <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
        <p className="titulo text-[1.6vw] font-medium">
          <span className="text-[1.8vw]">T</span>itulo Del Manga de Romance
        </p>
        <p className="precio text-[1.4vw]">Precio: $6000</p>
      </div>
      <div className="contentBotones w-full flex justify-evenly ">
        <button className="detalles bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm">
          Detalles
        </button>
        <button className="comprar bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm">
          Comprar
        </button>
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
      intervalId = setInterval(
        () => moverContenedor(contenedor, direccion),
        100
      );
    }
  };

  // Función para detener el desplazamiento
  const detenerDesplazamiento = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  return (
    <div>
      <div className="flex relative bg-purple-500 w-[76vw] justify-center py-[1vw]">
        <div
          ref={contenedor2Ref}
          id="contenedorTarjetas2"
          className="contenedorTarjetas gap-[1vw] py-[1vw] px-[1vw] bg-purple-800 flex w-[64.9vw] overflow-hidden"
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
          onMouseDown={() =>
            iniciarDesplazamiento(contenedor2Ref.current, "derecha")
          }
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
          onTouchStart={() =>
            iniciarDesplazamiento(contenedor2Ref.current, "derecha")
          }
          onTouchEnd={detenerDesplazamiento}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fi-rs-angle-right right-[0.1vw] w-[3vw] z-10"
          >
            <path
              d="M8.534,24l9.507-9.52a3.507,3.507,0,0,0,0-4.948L8.525,0,6.407,2.121,15.927,11.652a.5.5,0,0,1,0,.707L6.421,21.172Z"
              className="fill-[white]"
            />
          </svg>
        </button>

        {/* flecha derecha */}
        <button
          className="text-[2vw] absolute top-[17vw] left-[2vw]"
          onMouseDown={() =>
            iniciarDesplazamiento(contenedor2Ref.current, "izquierda")
          }
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
          onTouchStart={() =>
            iniciarDesplazamiento(contenedor2Ref.current, "izquierda")
          }
          onTouchEnd={detenerDesplazamiento}
        >
          <svg
            className="fi-rs-angle-right left-[0.1vw] w-[3vw] z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.041,24,6.534,14.48a3.507,3.507,0,0,1,0-4.948L16.052,0,18.17,2.121,8.652,11.652a.5.5,0,0,0,0,.707l9.506,9.52Z"
              className="fill-[white]"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

import imgCarrusel1 from "../assets/img/imgCarrusel1.avif";
import imgCarrusel2 from "../assets/img/imgCarrusel2.avif";
import imgCarrusel3 from "../assets/img/imgCarrusel3.avif";

const CarruselReact = () => (
  <Carousel autoplay>
    <div className="w-full h-[32vw]">
      <img className="w-full h-full" src={imgCarrusel1} alt="" />
    </div>
    <div className="w-full h-[32vw]">
      <img className="w-full h-full" src={imgCarrusel2} alt="" />
    </div>
    <div className="w-full h-[32vw]">
      <img className="w-full h-full" src={imgCarrusel3} alt="" />
    </div>
  </Carousel>
);

export default CarruselReact;
