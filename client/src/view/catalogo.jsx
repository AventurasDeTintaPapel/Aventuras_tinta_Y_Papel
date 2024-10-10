import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import React, { useEffect, useState } from "react";

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
        <div className="contentImg w-[15vw] h-[20.5vw] bg-slate-400 p-[0.5vw]">
          <img className="w-full h-full" src={imagen} alt={titulo} />
        </div>
        <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
          <div class="w-[13vw] border border-gray-300">
            <p class="truncate text-[1.5vw]">{titulo}</p>
          </div>
          <p className="precio text-[1.4vw]">Precio: {precio}</p>
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
    <div className="flex justify-center gap-[2vw] my-[2vw] flex-wrap">
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
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[65%_35%]">
      <Header />
      <main className="row-start-3 col-start-1 h-[100vh]">
        <div>
          <p className="text-[2vw] text-purple-950 mt-[1vw] font-bold text-center">CATALOGO DE COMICS</p>
          <ListarComics productos={productos} onAñadirCarrito={añadirCarrito} onAñadirFavorito={añadirFavorito} />
        </div>
      </main>
      <aside className="row-start-3 col-start-2" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div>
          <div className="bg-[#9d4edd] ">
            <p className="text-[3vw] ml-[2vw] text-[#f0e6ef]">FILTROS </p>
          </div>
          <div className="bg-[#c77dff] pl-[2vw] pt-[1vw] flex gap-[2vw]">
            <div className="flex gap-[1vw] items-center">
              <span className="text-[1.5vw]">Activo:</span>
              <div className="bg-[#f0e6ef] w-[4vw] h-[1.5vw]"></div>
            </div>
            <div className="flex gap-[1vw] items-center">
              <span className="text-[1.5vw]">Inactivo:</span>
              <div className="bg-slate-300 w-[4vw] h-[1.5vw]"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 py-[2vw] bg-[#c77dff]">
            <div className="flex flex-col items-center gap-[1.5vw]">
              <BotonFiltro filtro={"Romance"} />
              <BotonFiltro filtro={"Ciencia Ficcion"} />
              <BotonFiltro filtro={"Literatura"} />
              <BotonFiltro filtro={"Infantiles"} />
            </div>
            <div className="flex flex-col items-center gap-[1.5vw]">
              <BotonFiltro filtro={"Jueveniles"} />
              <BotonFiltro filtro={"Terror"} />
              <BotonFiltro filtro={"Triller"} />
            </div>
          </div>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

function BotonFiltro({ filtro }) {
  const [activo, setActivo] = useState(false);

  const botonActivo = () => {
    setActivo(!activo);
  };

  return (
    <button
      onClick={botonActivo}
      className={`${
        activo ? "bg-[#f0e6ef] text-[1.5vw] text-[#240046]" : "bg-slate-300 text-slate-600"
      } border w-[13vw] transition-all ease-in-out duration-200 rounded-[0.3vw] h-[3vw] flex items-center justify-center text-[1.3vw]`}
    >
      {filtro}
    </button>
  );
}
