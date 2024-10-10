import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";

import { GiRose } from "react-icons/gi";

import "@fontsource/baloo-2/700.css";

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
      <div className="tarjetas bg-slate-300 flex flex-col items-center w-auto pb-[0.5vw]">
        <div className="contentImg w-[15vw] h-[20.5vw]">
          <img className="w-full h-full" src={imagen} alt={titulo} />
        </div>
        <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
          <div class="w-[13vw] border border-gray-300">
            <p class="truncate text-[1.2vw] text-center">{titulo}</p>
          </div>
          <p className="precio text-[1.2vw]">Precio: {precio}</p>
        </div>
        <div className="contentBotones w-full flex justify-evenly ">
          <button
            onClick={() => onAñadirFavorito({ target: { dataset: { id } } })}
            className="detalles bg-violet-700 text-slate-200 text-[1.2vw] w-[45%] h-[2vw] rounded-sm"
          >
            Favoritos
          </button>
          <button
            onClick={() => onAñadirCarrito({ target: { dataset: { id } } })}
            className="comprar bg-violet-700 text-slate-200 text-[1.2vw] w-[45%] h-[2vw] rounded-sm"
          >
            Comprar
          </button>
        </div>
      </div>
    </>
  );
}

// Componente de lista de productos
const ListarComics = ({ productos, onAñadirCarrito, onAñadirFavorito }) => {
  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="text-[2vw]">No hay productos disponibles.</p>;
  }

  return (
    <div className="flex justify-center gap-[2vw] my-[2vw] mx-[2vw] flex-wrap">
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

  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost:3400/api/productos/catalogo/comic");
      const data = await response.json();
      console.log(data); // Verifica los productos obtenidos
      setProductos(data); // Actualiza el estado con los productos obtenidos
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[84%_16%]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
      <Header />
      <main className="row-start-3 col-start-1">
        <div>
          <ListarComics productos={productos} onAñadirCarrito={añadirCarrito} onAñadirFavorito={añadirFavorito} />
        </div>
      </main>
      <aside className="row-start-3 col-start-2">
        <div>
          <div className="bg-[#9d4edd]">
            <p className="text-[2vw] ml-[1vw] text-[#f0e6ef]">FILTROS </p>
          </div>
          <div>
            <div className="flex flex-col items-center gap-[0.5vw] bg-[#9d4edd] pb-[0.8vw]">
              <BotonFiltro icono={<GiRose />} filtro={"Romance"} />
              <BotonFiltro icono={<GiRose />} filtro={"Ciencia Ficcion"} />
              <BotonFiltro icono={<GiRose />} filtro={"Literatura"} />
              <BotonFiltro icono={<GiRose />} filtro={"Infantiles"} />
              <BotonFiltro icono={<GiRose />} filtro={"Jueveniles"} />
              <BotonFiltro icono={<GiRose />} filtro={"Terror"} />
              <BotonFiltro icono={<GiRose />} filtro={"Triller"} />
            </div>
          </div>
        </div>
      </aside>
      <Footer />
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
        activo ? " text-[1.4vw] pl-[1.5vw] bg-[#f0e6ef] text-[#240046]" : " text-slate-600 bg-[#d7adf7] pl-[1vw]"
      } w-[90%] border-b-[0.1vw] border-purple-400 transition-all ease-in-out duration-200 h-[3vw] flex items-center gap-[0.4vw]  text-[1.2vw]`}
    >
      {icono}
      {filtro}
    </button>
  );
}
