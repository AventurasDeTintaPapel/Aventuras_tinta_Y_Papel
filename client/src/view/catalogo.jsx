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
  const maxLength = 20; // Máxima longitud deseada para el título
  const tituloResumido = titulo.length > maxLength ? titulo.substring(0, maxLength) + "..." : titulo;

  return (
    <div className="tarjetas bg-slate-300 flex flex-col items-center w-[15vw] h-[32vw]">
      <div className="contentImg w-[15vw] h-[20.5vw] bg-slate-400 p-[0.5vw]">
        <img className="w-full h-full" src={imagen} alt={titulo} />
      </div>
      <div className="contenedorInfo flex flex-col my-[0.5vw] gap-[0.8vw] w-[85%]">
        <p className="titulo text-[1.6vw] font-medium">{tituloResumido}</p>
        <p className="precio text-[1.4vw]">Precio: {precio}</p>
      </div>
      <div className="contentBotones w-full flex justify-evenly ">
        <button
          className="detalles bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm"
          onClick={() => onAñadirFavorito({ target: { dataset: { id } } })}
        >
          Favorito
        </button>
        <button
          className="comprar bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm"
          onClick={() => onAñadirCarrito({ target: { dataset: { id } } })}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

// Componente de lista de productos
const ListarComics = ({ productos, onAñadirCarrito, onAñadirFavorito }) => {
  // Verifica que productos sea un array
  if (!Array.isArray(productos) || productos.length === 0) {
    return <p>No hay productos disponibles.</p>; // Mensaje o componente alternativo
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
    obtenerProductos(); // Llama a la función para obtener productos al montar el componente
  }, []);

  return (
    <>
      <Header />
      <Nav />
      <main>
        <div>
          <p className="text-[2vw] text-purple-950 mt-[1vw] font-bold text-center">CATALOGO DE COMICS</p>
          <ListarComics productos={productos} onAñadirCarrito={añadirCarrito} onAñadirFavorito={añadirFavorito} />
        </div>
      </main>
      <Footer />
    </>
  );
}
