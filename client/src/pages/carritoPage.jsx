import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { Header } from "../components/Header";

import PayPalPayment from "../components/PaypalComponent.JSX";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

export default function Carrito() {
  const [carrito, setCarrito] = useState(null); // Usamos null para verificar si la data ha llegado
  const [error, setError] = useState(null); // Para manejar errores

  const fetchCarrito = async () => {
    try {
      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCarrito(data); // Asumimos que 'data' tiene una estructura que contiene 'productos'
    } catch (error) {
      console.error("fetchCarrito: ", error);
      setError(error.message); // Guardamos el mensaje de error en el estado
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (carrito === null) {
    return <div>Cargando...</div>;
  }

  function EliminarProducto({ idProducto }) {
    const handleEliminarProducto = async () => {
      try {
        const response = await fetch("http://localhost:3400/api/pedidos/element", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idProducto }),
        });

        const data = await response.json();
        fetchCarrito();
      } catch (error) {
        console.error("Error al eliminar producto", error);
      }
    };

    return (
      <button
        onClick={handleEliminarProducto}
        className=" absolute right-[0.8vw] top-[0.5vw] text-[1.2vw] rounded border border-red-600 text-red-700 hover:scale-105 transition ease-in-out duration-200 px-[0.5vw]"
      >
        Eliminar
      </button>
    );
  }

  function MasUnproducto({ idProduct, cantidad, desactivar }) {
    const amount = cantidad + 1;

    const EditarProducto = async () => {
      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount, idProduct }),
      });

      if (!response.ok) {
        console.log("Error al actualizar la cantidad del producto.");
      }

      fetchCarrito();
    };

    return (
      <button
        disabled={desactivar}
        onClick={EditarProducto}
        className={`${desactivar ? "bg-slate-200" : "bg-green-200"} w-[1.2vw] h-[2vw] flex justify-center items-center rounded`}
      >
        <SlArrowRight className={`${desactivar ? "text-slate-600" : "text-green-800"} text-[1.4vw]`} />
      </button>
    );
  }

  function MenosUnproducto({ idProduct, cantidad, desactivar }) {
    const amount = cantidad - 1;

    const EditarProducto = async () => {
      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount, idProduct }),
      });

      if (!response.ok) {
        console.log("Error al actualizar la cantidad del producto.");
      }

      fetchCarrito();
    };

    return (
      <button
        disabled={desactivar}
        onClick={EditarProducto}
        className={`${desactivar ? "bg-slate-200" : "bg-red-200"} w-[1.2vw] h-[2vw] flex justify-center items-center rounded`}
      >
        <SlArrowLeft className={`${desactivar ? "text-slate-600" : "text-red-800"} text-[1.4vw]`} />
      </button>
    );
  }

  const SumaProductos = ({ productos }) => {
    // Función para calcular la suma total
    const calcularTotal = () => {
      return productos.reduce((acc, producto) => {
        return acc + producto.producto.precio * producto.cantidad;
      }, 0);
    };

    // Calcular el total al inicio o cuando los productos cambian
    const total = calcularTotal();

    return <p className="text-end "> ${total}</p>;
  };

  return (
    <div className="grid grid-cols-[70%_30%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1 col-span-2"} />
      <Nav colAndrow={"row-start-2 col-span-2"} />
      <aside className="row-start-3 col-start-2 bg-gray-100 px-[1vw] py-[0.5vw] font-poopins">
        <div className="">
          <p className="font-bold text-[1.4vw] border-b mb-[0.5vw] pb-[0.5vw] border-slate-300"> Productos:</p>
          {carrito.productos.map((producto) => (
            <div className="grid grid-cols-[75%_25%]">
              <p className=" py-[0.3vw] text-slate-800 truncate px-[0.5vw]">{producto.producto.titulo}</p>
              <p className=" py-[0.3vw] text-slate-800 text-end px-[0.5vw]">${producto.producto.precio * producto.cantidad}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 pr-[0.5vw] mt-[0.5vw] py-[0.5vw] text-[1.3vw] border-t border-slate-300">
            <p className="font-semibold">Total:</p>
            <SumaProductos productos={carrito.productos} />
          </div>
        </div>

        <PayPalPayment></PayPalPayment>
      </aside>
      <main className="row-start-3 col-start-1">
        <div className="bg-slate-50 w-full h-full">
          {/* contenedor */}
          <div className=" space-y-[1vw] justify-items-center p-[2vw]">
            {carrito.productos && carrito.productos.length === 0 && (carrito.estado === "completado" || carrito.estado === "entregado") ? (
              <p>El carrito está vacío</p>
            ) : (
              carrito.productos.map((producto) => (
                // tarjeta
                <div key={producto._id} className="border border-slate-300 rounded p-[0.5vw] w-[90%] font-poopins">
                  {producto.producto ? (
                    <div className="grid grid-cols-[20%_80%] ">
                      {/* imagen */}
                      <div className="w-full h-full">
                        <img className="w-full h-[18vw]  object-cover" src={producto.producto.imagen} alt="" />
                      </div>

                      {/* informacion */}
                      <div className="relative w-full rounded-r-[0.8vw]">
                        <EliminarProducto idProducto={producto.producto._id} />
                        <div className="pl-[1vw] space-y-[0.5vw]">
                          <p className="truncate text-[1.8vw] font-semibold">{producto.producto.titulo}</p>
                          <p className="text-[1.3vw]">
                            <span className="text-slate-800 font-medium">Autor: </span>
                            {producto.producto.autor}
                          </p>
                          <p className="text-[1.3vw]">
                            <span className="font-medium">Precio individual: </span>${producto.producto.precio}
                          </p>
                          <p className="text-[1.3vw]">
                            <span className="font-medium">Total individual: </span>${producto.producto.precio * producto.cantidad}
                          </p>
                          <div className="flex gap-[0.5vw] border-[0.1vw] py-[0.3vw] px-[0.3vw] rounded-[0.5vw] absolute right-0 bottom-0">
                            <MenosUnproducto
                              idProduct={producto.producto._id}
                              cantidad={producto.cantidad}
                              desactivar={producto.cantidad <= 1} // Desactivar si cantidad <= 1
                            />
                            <p className="flex text-[1.2vw] items-center">Cantidad: {producto.cantidad}</p>

                            <MasUnproducto
                              idProduct={producto.producto._id}
                              cantidad={producto.cantidad}
                              desactivar={producto.cantidad >= producto.producto.stock} // Desactivar si cantidad >= stock
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>Error al cargar producto</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer colAndrow={"row-start-4 col-span-2"} />
    </div>
  );
}
