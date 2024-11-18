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

  function ButtonDelete({ productoId }) {
    const eliminarProductoCart = async () => {
      try {
        const response = await fetch("http://localhost:3400/api/pedidos/element", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idProduct: productoId }),
        });
        console.log(productoId);
        if (!response.ok) {
          console.log("Error del servidor al eliminar producto.");
        }
      } catch (error) {
        console.log("BotonEliminar:", error);
      }
    };

    return (
      <button onClick={eliminarProductoCart} className="bg-red-200 w-[2vw] h-[3.5vw] flex justify-center items-center rounded text-red-800">
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
    };

    return (
      <button
        disabled={desactivar}
        onClick={EditarProducto}
        className={`${desactivar ? "bg-slate-200" : "bg-green-200"} w-[2vw] h-[3.5vw] flex justify-center items-center rounded`}
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
    };

    return (
      <button
        disabled={desactivar}
        onClick={EditarProducto}
        className={`${desactivar ? "bg-slate-200" : "bg-red-200"} w-[2vw] h-[3.5vw] flex justify-center items-center rounded`}
      >
        <SlArrowLeft className={`${desactivar ? "text-slate-600" : "text-red-800"} text-[1.4vw]`} />
      </button>
    );
  }

  console.log(carrito.productos);

  return (
    <div className="grid grid-cols-[70%_30%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1 col-span-2"} />
      <Nav colAndrow={"row-start-2 col-span-2"} />
      <aside className="row-start-3 col-start-2 bg-gray-100 p-[1vw]"></aside>
      <main className="row-start-3 col-start-1">
        <div className="bg-blue-50 w-full h-full">
          <div>
            <h2>Carrito</h2>
          </div>
          <div className="justify-items-center py-[2vw] space-y-[2vw]">
            {carrito.productos && carrito.productos.length === 0 && (carrito.estado === "completado" || carrito.estado === "entregado") ? (
              <p>El carrito está vacío</p>
            ) : (
              carrito.productos.map((producto) => (
                <div key={producto._id} className="bg-white shadow-md rounded-[1vw] grid w-[60vw] grid-cols-[20%_80%] p-[1vw]">
                  {producto.producto ? (
                    <div>
                      <div className="w-full h-[18vw]">
                        <img className="w-full h-full rounded-[0.8vw] object-cover" src={producto.producto.imagen} alt="" />
                      </div>
                      <div className="relative w-full rounded-r-[0.8vw]">
                        <div className="pl-[1vw] space-y-[0.5vw]">
                          <p className="truncate text-[1.8vw] font-medium">{producto.producto.titulo}</p>
                          <p className="text-[1.3vw]">
                            <span className="text-slate-800 font-medium">Autor: </span>
                            {producto.producto.autor}
                          </p>
                          <p className="text-[1.3vw]">
                            <span className="text-slate-800 font-medium">Precio individual: </span>${producto.producto.precio}
                          </p>
                          <p className="text-[1.3vw]">
                            <span className="text-slate-800 font-medium">Total: </span>${producto.producto.precio * producto.producto.cantidad}
                          </p>
                          <div className="flex gap-[1vw] border-[0.2vw] py-[0.3vw] px-[0.3vw] rounded-[0.5vw] absolute right-0 bottom-0">
                            <MenosUnproducto
                              idProduct={producto._id}
                              cantidad={producto.cantidad}
                              desactivar={producto.cantidad <= 1} // Desactivar si cantidad <= 1
                            />
                            <p className="flex text-[1.7vw] items-center">Cantidad: {producto.cantidad}</p>
                            <MasUnproducto
                              idProduct={producto._id}
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
                  <ButtonDelete productoId={producto._id} />
                </div>
              ))
            )}
          </div>
        </div>
        <PayPalPayment></PayPalPayment>
      </main>

      <Footer colAndrow={"row-start-4 col-span-2"} />
    </div>
  );
}
