import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import PayPalPayment from "../components/PaypalComponent.JSX";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { CorazonFav } from "../components/Fav";
import { MasInfo } from "./catalogoPage";

function ArrowAgregar({ agregarProductoAlCarrito, producto }) {
  return (
    <button
      onClick={() => agregarProductoAlCarrito(producto)}
      className="bg-purple-200 w-[2vw] h-[3.5vw] flex justify-center items-center rounded"
    >
      <SlArrowRight className="text-[1.4vw] text-purple-800" />
    </button>
  );
}

function ArrowEliminar({ idProducto, eliminarProducto, desactivar }) {
  return (
    <button
      disabled={desactivar}
      onClick={() => eliminarProducto(idProducto)}
      className={`${
        desactivar ? "bg-slate-200" : "bg-purple-200"
      } w-[2vw] h-[3.5vw] flex justify-center items-center rounded`}
    >
      <SlArrowLeft
        className={`${
          desactivar ? "text-slate-600" : "text-purple-800"
        } text-[1.4vw]`}
      />
    </button>
  );
}

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  async function obtenerCarrito() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return [];
      }

      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const carrito = await response.json();
      console.log(carrito);

      // return data.carrito || [];
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return [];
    }
  }
  obtenerCarrito();
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  };

  // useEffect(() => {
  //   const cargarCarrito = async () => {
  //     const productosCarrito = await obtenerCarrito();
  //     setCarrito(productosCarrito);
  //   };

  //   cargarCarrito();
  // }, []);

  const eliminarProducto = async (idProducto) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("El usuario no está autenticado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3400/api/pedidos/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ idProducto }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setCarrito((prev) =>
        prev.filter((producto) => producto._id !== idProducto)
      );
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <div className="grid grid-cols-[70%_30%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1 col-span-2"} />
      <Nav colAndrow={"row-start-2 col-span-2"} />

      {/* Resumen del carrito */}
      <aside className="row-start-3 col-start-2 bg-gray-100 p-[1vw]">
        <div className="bg-white shadow-md p-[1vw]">
          <p className="text-[1.4vw] font-semibold mb-[1vw] text-gray-800">
            Resumen del Carrito
          </p>

          <div className="mb-[1vw]">
            <div className="flex justify-between text-[1.2vw] font-medium text-gray-700 border-b pb-[0.5vw] mb-[1vw] pr-[1.5vw]">
              <p>Producto</p>
              <p>Precio</p>
            </div>

            {productos.length === 0 ? (
              <p className="text-gray-500 italic">El carrito está vacío</p>
            ) : (
              <div className="space-y-[1vw] px-[0.5vw]">
                {productos.map((producto) => (
                  <div
                    key={producto._id}
                    className="flex gap-[0.8vw] justify-between items-center text-[1vw]"
                  >
                    <p className="font-medium text-slate-700">
                      {producto.cantidad}
                    </p>
                    <span className="truncate flex-1 mr-[2vw]">
                      {producto.producto.titulo}
                    </span>
                    <span className="font-medium">
                      ${producto.precio * producto.cantidad}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-[1vw]">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span className="text-[1.2vw]">Total:</span>
              <span className="text-green-600 text-[1.2vw]">
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Productos en el carrito */}
      <main className="row-start-3 col-start-1">
        <div className="bg-blue-50 w-full h-full">
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <div className="justify-items-center py-[2vw] space-y-[2vw]">
              {carrito.map((producto) => (
                <div
                  key={producto._id}
                  className="bg-white shadow-md rounded-[1vw] grid w-[60vw] grid-cols-[20%_80%] p-[1vw]"
                >
                  <div className="w-full h-[18vw]">
                    <img
                      className="w-full h-full rounded-[0.8vw] object-cover"
                      src={producto.producto.imagen}
                      alt={producto.producto.titulo}
                    />
                  </div>
                  <div className="relative w-full rounded-r-[0.8vw]">
                    <div className="pl-[1vw] space-y-[0.5vw]">
                      <div className="w-[80%]">
                        <p className="truncate text-[1.8vw] font-medium ">
                          {producto.producto.titulo}
                        </p>
                      </div>
                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">
                          Autor:{" "}
                        </span>
                        {producto.autor}
                      </p>

                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">
                          Precio individual:{" "}
                        </span>
                        ${producto.precio}
                      </p>
                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">
                          Total:{" "}
                        </span>
                        ${producto.precio * producto.cantidad}
                      </p>
                    </div>

                    <div className="flex justify-between absolute bottom-[1vw] left-[1vw] w-[97%]">
                      <ArrowEliminar
                        idProducto={producto._id}
                        eliminarProducto={eliminarProducto}
                        desactivar={producto.cantidad <= 1}
                      />
                      <ArrowAgregar
                        agregarProductoAlCarrito={agregarProductoAlCarrito}
                        producto={producto}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer colAndrow={"col-start-1 row-start-4"} />
    </div>
  );
}
