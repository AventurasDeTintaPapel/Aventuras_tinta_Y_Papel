import React, { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAlert } from "../hook/useAlert";
import { MasInfo } from "../pages/catalogoPage";
import { CorazonFav } from "./Fav";

// boton agregar a carrito
export function BotonComprar({ producto, estilos }) {
  const { Alerta, mostrarAlerta } = useAlert();

  const agregarProductoAlCarrito = async () => {
    const cantidad = 1;
    try {
      const response = await fetch("http://localhost:3400/api/pedidos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idProducto: producto,
          cantidad,
        }),
      });
      console.log(response);
      if (response.data) {
        console.log("Pedido registrado con éxito:", response.data);
        mostrarAlerta("Producto agregado al carrito exitosamente.");
        setCarrito((prev) => [...prev, { ...producto, cantidad }]); //
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      mostrarAlerta("Hubo un error al agregar el producto al carrito.");
    }
  };

  return (
    <>
      <button onClick={agregarProductoAlCarrito} className={estilos}>
        Enivar a carrito
      </button>
      {Alerta}
    </>
  );
}

const traerProductos = async (setProductos) => {
  try {
    const response = await axios.get("http://localhost:3400/api/productos");
    setProductos(response.data);
  } catch (error) {
    console.error("Se produjo un error al traer los productos", error);
  }
};

export function CatalogoPrueba() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    traerProductos(setProductos);
  }, []);

  return (
    <div className="flex gap-[2vw] overflow-x-auto w-[80vw] py-[1vw]">
      {productos.slice(0, 8).map((producto) => (
        <div
          key={producto._id}
          className=" h-[30vw] relative flex flex-col rounded-[0.5vw] shadow-xl hover:outline hover:outline-offset-[0.3vw] outline-purple-800 hover:border-[0.3vw] bg-white border-purple-800 group transition-all ease-in-out duration-150"
        >
          {/* imagen */}
          <div className="w-[15vw] h-[22vw] relative">
            <img
              className="w-full h-full rounded-t-lg group-hover:rounded-t-[0.2vw] transition-all ease-in-out duration-150 object-cover"
              src={producto.imagen}
              alt={producto.titulo}
            />
            <MasInfo
              id={producto._id}
              text={"Mas informacion"}
              estilos={
                " absolute bottom-[0.5vw] font-breeSerif left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-white hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] hover:translate-y-[0.05vw] transition-all ease-in-out duration-300"
              }
            />
          </div>
          {/* titulo y precio */}
          <div className=" h-full relative pt-[0.5vw] pl-[1vw]">
            <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
            <CorazonFav key={producto._id} producto={producto} estilo={"text-[#5a189a] absolute right-[1vw] top-[0.8vw] text-[1.5vw]"} />

            <p className="text-[1.6vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
          </div>

          {/* boton */}
          <BotonComprar
            producto={producto}
            estilos={
              "bg-[#7c23c9] absolute bottom-0 w-full rounded-b-lg group-hover:rounded-b-[0.2vw] transition-all ease-in-out duration-150 text-slate-100 hover:text-white hover:bg-[#6017a4] h-[2.3vw] text-[1.3vw] hover:text-[1.4vw]"
            }
          />
        </div>
      ))}
    </div>
  );
}

export function CatalogoPrueba2() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    traerProductos(setProductos);
  }, []);

  return (
    <div className="flex gap-[2vw] overflow-x-auto w-[80vw] py-[1vw]">
      {productos.slice(-6).map((producto) => (
        <div
          key={producto._id}
          className=" h-[30vw] relative flex flex-col rounded-[0.5vw] shadow-xl hover:outline hover:outline-offset-[0.3vw] outline-purple-800 hover:border-[0.3vw] bg-white border-purple-800 group transition-all ease-in-out duration-150"
        >
          {/* imagen */}
          <div className="w-[15vw] h-[22vw] relative">
            <img
              className="w-full h-full rounded-t-lg group-hover:rounded-t-[0.2vw] transition-all ease-in-out duration-150 object-cover"
              src={producto.imagen}
              alt={producto.titulo}
            />
            <MasInfo
              id={producto._id}
              text={"Mas informacion"}
              estilos={
                " absolute bottom-[0.5vw] font-breeSerif left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-white hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] hover:translate-y-[0.05vw] transition-all ease-in-out duration-300"
              }
            />
          </div>
          {/* titulo y precio */}
          <div className=" h-full relative pt-[0.5vw] pl-[1vw]">
            <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
            <CorazonFav key={producto._id} producto={producto} estilo={"text-[#5a189a] absolute right-[1vw] top-[0.8vw] text-[1.5vw]"} />

            <p className="text-[1.6vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
          </div>

          {/* boton */}
          <BotonComprar
            producto={producto}
            estilos={
              "bg-[#7c23c9] absolute bottom-0 w-full rounded-b-lg group-hover:rounded-b-[0.2vw] transition-all ease-in-out duration-150 text-slate-100 hover:text-white hover:bg-[#6017a4] h-[2.3vw] text-[1.3vw] hover:text-[1.4vw]"
            }
          />
        </div>
      ))}
    </div>
  );
}

const imagenes = [
  {
    id: 1,
    imgUrl: "../assets/img/imgComics.png",
  },
  {
    id: 2,
    imgUrl: "../assets/img/imgLirbos.png",
  },
  {
    id: 3,
    imgUrl: "../assets/img/imgManga.png",
  },
];

export function CarruselInicio() {
  const listRef = useRef();
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full h-[30vw]">
      <div className="relative h-full">
        <div className="w-full h-full border-red-400 rounded-[20px] border-[3px] overflow-hidden">
          <ul ref={listRef}>
            {imagenes.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.imgUrl} className="w-full h-[30vw]" alt="" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function IconoCargando() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <circle cx={12} cy={2} r={0} fill="currentColor">
        <animate
          attributeName="r"
          begin={0}
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(45 12 12)">
        <animate
          attributeName="r"
          begin="0.125s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(90 12 12)">
        <animate
          attributeName="r"
          begin="0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(135 12 12)">
        <animate
          attributeName="r"
          begin="0.375s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(180 12 12)">
        <animate
          attributeName="r"
          begin="0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(225 12 12)">
        <animate
          attributeName="r"
          begin="0.625s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(270 12 12)">
        <animate
          attributeName="r"
          begin="0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={2} r={0} fill="currentColor" transform="rotate(315 12 12)">
        <animate
          attributeName="r"
          begin="0.875s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
    </svg>
  );
}
