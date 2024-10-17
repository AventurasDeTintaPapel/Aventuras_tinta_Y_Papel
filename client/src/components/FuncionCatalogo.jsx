// Productos.js (Asegúrate de que este archivo se llame así)
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

// Cambiar el nombre a useProductos para seguir la convención
export function useProductos(filtrosActivos) {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const { tipo } = useParams();

  const obtenerProductos = async (categoria) => {
    try {
      const queryParams = new URLSearchParams({ query: tipo });
      if (categoria) queryParams.append("categoria", categoria);
      const response = await fetch(`http://localhost:3400/api/filters?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  };

  useEffect(() => {
    obtenerProductos(); // Llama a obtener productos al montar el componente
  }, [tipo]);

  useEffect(() => {
    // Actualiza productos filtrados cuando cambian los filtros
    const categoria = Object.keys(filtrosActivos).find((key) => filtrosActivos[key]);
    if (categoria) {
      obtenerProductos(categoria);
    } else {
      setProductosFiltrados(productos); // Si no hay filtros, mostrar todos los productos
    }
  }, [filtrosActivos, productos]); // Añadir 'productos' para que se actualice correctamente

  return { productos, productosFiltrados };
}

function TarjetaProducto({ imagen, titulo, precio, id, onAñadirFavorito, onAñadirCarrito }) {
  return (
    <a
      href="http://localhost:5173/detalles"
      className="bg-[#5b85aa] h-[28.6vw] flex flex-col items-center justify-between w-auto pb-[0.5vw] group transition-all ease-in-out duration-300 hover:h-[30vw] hover:shadow-custom-shadow"
    >
      <div className="contentImg w-[15vw] h-[20.5vw] group-hover:w-[16vw] group-hover:h-[21.5vw] transition-all ease-in-out duration-300">
        <img className="w-full h-full" src={imagen} alt={titulo} />
      </div>
      <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
        <div className="w-[13vw]">
          <p className="truncate text-[1.2vw] text-center">{titulo}</p>
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
  );
}

function ListarComics({ productos, onAñadirCarrito, onAñadirFavorito }) {
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
          onAñadirCarrito={onAñadirCarrito}
          onAñadirFavorito={onAñadirFavorito}
        />
      ))}
    </div>
  );
}

export function ProductoReact() {
  const { productos, productosFiltrados } = useProductos(); // Asegúrate de que el hook esté en minúsculas
  const productosAMostrar = productosFiltrados.length > 0 ? productosFiltrados : productos;

  return (
    <div>
      <ListarComics productos={productosAMostrar} />
    </div>
  );
}
