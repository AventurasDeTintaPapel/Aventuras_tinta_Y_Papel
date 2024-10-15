import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { createRoot } from "react-dom/client";

import "@fontsource/baloo-2/700.css";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";

// Función para añadir al carrito
const añadirCarrito = async (event) => {
  const idProducto = event.target.dataset.id; // Obtén el ID del producto desde el dataset del botón
  const token = localStorage.getItem("token");
  const totalFinal = calcularTotal(); // Implementa esta función para calcular el total basado en el carrito

  if (!token) {
    alert("Debe registrarse para poder realizar esta tarea");
    return; // Salir de la función si no hay token
  }

  console.log(idProducto, totalFinal);
  try {
    const cargarCarrito = await fetch(`http://localhost:3400/api/pedidos/`, {
      method: "POST",
      body: JSON.stringify({
        totalFinal, // Agrega el total final
        productos: [{ idProducto }], // Envía los productos como un array
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token como un encabezado de autorización
      },
    });

    if (cargarCarrito.ok) {
      const response = await cargarCarrito.json(); // Manejar la respuesta del servidor
      alert("Se añadió el producto al carrito");
      console.log(response); // Para ver la respuesta del servidor en la consola
    } else {
      const errorResponse = await cargarCarrito.json();
      alert(errorResponse.msg || "Error al añadir el producto al carrito");
    }
  } catch (error) {
    console.log(error);
    alert("Se produjo un error al añadir el producto al carrito");
  }
};

// Implementa esta función según tu lógica para calcular el total final
const calcularTotal = () => {
  // Aquí deberías implementar la lógica para calcular el total basado en los productos en el carrito
  return 0; // Retorna el total calculado (esto es un ejemplo)
};

// Función para añadir a favoritos
const añadirFavorito = async (event) => {
  const idProducto = event.target.dataset.id;
  const token = localStorage.getItem("token"); // Asegúrate de obtener el token aquí
  console.log(idProducto);

  try {
    const cargarFavoritos = await fetch(`http://localhost:3400/favoritos/6692cf802772b70d57574598`, {
      method: "POST",
      body: JSON.stringify({
        idProducto,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token si es necesario
      },
    });

    if (cargarFavoritos.ok) {
      alert("Se ha añadido el producto a favoritos");
    } else {
      const errorResponse = await cargarFavoritos.json();
      alert(errorResponse.msg || "Error al añadir a favoritos");
    }
  } catch (error) {
    console.log(error);
    alert("Se produjo un error al añadir a favoritos");
  }
};

// Componente de tarjeta del producto
function TarjetaProducto({ imagen, titulo, precio, id, onAñadirFavorito, onAñadirCarrito }) {
  return (
    <>
      <a
        href="http://localhost:5173/detalles"
        className="bg-[#5b85aa] h-[28.6vw] flex flex-col items-center justify-between w-auto pb-[0.5vw] group transition-all ease-in-out duration-300 hover:h-[30vw] hover:shadow-custom-shadow"
      >
        <div className="contentImg w-[15vw] h-[20.5vw] group-hover:w-[16vw] group-hover:h-[21.5vw] transition-all ease-in-out duration-300">
          <img className="w-full h-full" src={imagen} alt={titulo} />
        </div>
        <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
          <div class="w-[13vw]">
            <p class="truncate text-[1.2vw] text-center">{titulo}</p>
          </div>
          <p className="precio text-[1.2vw]">Precio: {precio}</p>
        </div>
        <div className="contentBotones w-full flex justify-evenly ">
          <button
            onClick={() => onAñadirFavorito({ target: { dataset: { id } } })}
            className="detalles bg-[#414770] text-slate-200 text-[1.2vw] w-[45%] h-[2vw] rounded-sm"
          >
            Favoritos
          </button>
          <button
            onClick={() => onAñadirCarrito({ target: { dataset: { id } } })}
            className="comprar bg-[#414770] text-slate-200 text-[1.2vw] w-[45%] h-[2vw] rounded-sm"
          >
            Comprar
          </button>
        </div>
      </a>
    </>
  );
}

// Componente de lista de productos
const ListarComics = ({ productos, onAñadirCarrito, onAñadirFavorito }) => {
  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="text-[2vw]">No hay productos disponibles.</p>;
  }

  return (
    <div className="flex justify-center gap-[2vw] my-[2vw] mx-[2vw] flex-wrap ">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto._id}
          imagen={producto.imagen}
          titulo={producto.titulo}
          precio={producto.precio}
          id={producto._id}
          onAñadirCarrito={onAñadirCarrito} // Pasa la función aquí
          onAñadirFavorito={onAñadirFavorito} // Pasa la función aquí
        />
      ))}
    </div>
  );
};

// Componente principal del catálogo
export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams();

  const obtenerProductos = async () => {
    try {
      const response = await fetch(`http://localhost:3400/api/productos/catalogo/${categoria}`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  };

  useEffect(() => {
    obtenerProductos(); // Llama a obtenerProductos cada vez que cambia la categoría
  }, [categoria]); // La dependencia es 'categoria', se recarga cuando esta cambia

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[81%_19%] h-screen" style={{ fontFamily: "'Baloo 2', system-ui" }}>
      <Header colAndrow={"row-start-1 col-span-2"} />
      <Nav colAndrow={"row-start-2 col-span-2"} />
      <main className="row-start-3 col-start-1 bg-[#f4ecf3]">
        <Divider
          orientation="left"
          style={{ borderColor: "#5a189a", fontSize: "2.5vw", textTransform: "uppercase", color: "#3c096c", fontFamily: "'Baloo 2', system-ui" }}
        >
          {categoria}
        </Divider>
        <div>
          <ListarComics productos={productos} onAñadirCarrito={añadirCarrito} onAñadirFavorito={añadirFavorito} />
        </div>
      </main>
      <aside className="row-start-3 col-start-2 bg-[#dacaff]">
        <div>
          <div className="bg-[#9d4edd]">
            <p className="text-[2vw] ml-[1vw] text-[#f0e6ef]">FILTROS </p>
          </div>
          <div id="contenedorFiltros"></div>
        </div>
      </aside>
      <Footer rowAndcol={"row-start-4  col-span-2"} />
    </div>
  );
}

function BotonFiltro({ filtro, icono }) {
  const [activo, setActivo] = useState(false);

  const botonActivo = () => {
    setActivo(!activo);
  };

  return (
    <button
      onClick={botonActivo}
      className={`${
        activo ? " text-[1.4vw] bg-[#f0e6ef] justify-center text-[#240046]" : " text-slate-600 bg-slate-300 pl-[1vw]"
      } w-[90%] border-b-[0.1vw] border-purple-400 transition-all ease-in-out duration-200 h-[3vw] flex items-center gap-[0.4vw]  text-[1.4vw]`}
    >
      {icono}
      {filtro}
    </button>
  );
}

// funcion para cambiar el aside
function onLoad() {
  const paginaAside = document.getElementById("contenedorFiltros");

  // Verifica si el elemento existe
  if (paginaAside) {
    const URLactual = window.location.pathname;

    if (URLactual === "/catalogo/libros") {
      const root = createRoot(paginaAside);
      root.render(<AsideLibros />);
    } else if (URLactual === "/catalogo/mangas") {
      const root = createRoot(paginaAside);
      root.render(<AsideMangas />);
    } else if (URLactual === "/catalogo/comics") {
      const root = createRoot(paginaAside);
      root.render(<AsideComics />);
    } else if (URLactual === "/catalogo/mercancia") {
      const root = createRoot(paginaAside);
      root.render(<AsideMercancia />);
    }
  }
}

window.addEventListener("load", onLoad);

// Aside de libros
function AsideLibros() {
  return (
    <div className="flex flex-col items-center gap-[0.5vw] bg-[#9d4edd] pb-[0.8vw]">
      <BotonFiltro filtro={"Romance"} />
      <BotonFiltro filtro={"Ciencia Ficcion"} />
      <BotonFiltro filtro={"Literatura"} />
      <BotonFiltro filtro={"Infantiles"} />
      <BotonFiltro filtro={"Juveniles"} />
      <BotonFiltro filtro={"Terror"} />
      <BotonFiltro filtro={"Triller"} />
    </div>
  );
}

// Aside mangas
function AsideMangas() {
  return (
    <div className="flex flex-col items-center gap-[0.5vw] bg-[#9d4edd] pb-[0.8vw]">
      <BotonFiltro filtro={"Shonen"} />
      <BotonFiltro filtro={"Seinen"} />
      <BotonFiltro filtro={"Yuri"} />
      <BotonFiltro filtro={"Josei"} />
      <BotonFiltro filtro={"Shojo"} />
      <BotonFiltro filtro={"Boyslove"} />
    </div>
  );
}

// Aside comics
function AsideComics() {
  return (
    <div className="flex flex-col items-center gap-[0.5vw] bg-[#9d4edd] pb-[0.8vw]">
      <BotonFiltro filtro={"Superhéroes"} />
      <BotonFiltro filtro={"Ciencia Ficción"} />
      <BotonFiltro filtro={"Fantasía"} />
      <BotonFiltro filtro={"Terror"} />
      <BotonFiltro filtro={"Romance"} />
      <BotonFiltro filtro={"Comedia"} />
      <BotonFiltro filtro={"Slice of Life"} />
      <BotonFiltro filtro={"Histórico"} />
    </div>
  );
}

// Aside mercancia
function AsideMercancia() {
  return (
    <div className="flex flex-col items-center gap-[0.5vw] bg-[#9d4edd] pb-[0.8vw]">
      <BotonFiltro filtro={"Remeras"} />
      <BotonFiltro filtro={"Posters"} />
      <BotonFiltro filtro={"Llaveros"} />
      <BotonFiltro filtro={"Pines"} />
      <BotonFiltro filtro={"Tazas"} />
    </div>
  );
}
