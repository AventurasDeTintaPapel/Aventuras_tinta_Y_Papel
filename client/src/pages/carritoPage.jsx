import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { Header } from "../components/Header";

import PayPalPayment from "../components/PaypalComponent.JSX";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

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
      setCarrito(data);
    } catch (error) {
      console.error("fetchCarrito: ", error);
    }
  };

  // Simulamos el fetch para obtener los datos del carrito
  useEffect(() => {
    fetchCarrito();
  }, []); // Se ejecuta solo una vez al montar el componente

  const FiltroProductosIncompletos = carrito?.filter((pedido) => pedido.estado === "incompleto");
  console.log("FiltroProductosIncompletos:", FiltroProductosIncompletos);

  const FiltroProductosEntregados = carrito?.filter((pedido) => pedido.estado !== "incompleto");
  console.log("FiltroProductosIncompletos:", FiltroProductosIncompletos);

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return FiltroProductosIncompletos.reduce((total, pedido) => {
      return (
        total +
        pedido.productos.reduce((subtotal, item) => {
          return subtotal + item.producto.precio * item.cantidad;
        }, 0)
      );
    }, 0);
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[70%_30%] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />
      <aside className="row-start-3 col-start-2 bg-gray-100 px-[1vw] py-[0.5vw] font-poopins">
        <div className="">
          <p className="font-bold text-[1.4vw] border-b mb-[0.5vw] pb-[0.5vw] border-slate-300"> Productos:</p>
          {FiltroProductosIncompletos.map((arrayProductos, index) => (
            <div className="space-y-3" key={index}>
              {arrayProductos.productos.map((item) => (
                <div className="grid grid-cols-[75%_25%] text-[1.1vw] px-[0.5vw]" key={item._id}>
                  <p className="truncate  py-[0.3vw] text-slate-900 font-semibold">{item.producto.titulo}</p>
                  <p className="text-end py-[0.3vw]"> ${item.producto.precio * item.cantidad}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="grid grid-cols-2 pr-[0.5vw] mt-[0.5vw] py-[0.5vw] text-[1.3vw] border-t border-slate-300">
            <p className="font-semibold">Total:</p>
            <p className="text-end">${calcularTotal()}</p>
          </div>
        </div>

        <PayPalPayment></PayPalPayment>
      </aside>
      <main className="font-poopins col-start-1 row-start-3 p-[1vw] space-y-[2vw]">
        {/* contenedor de pedidos incompletos */}
        <div className="">
          {FiltroProductosIncompletos.length === 0 ? (
            <p>No tienes pedidos completados aun</p>
          ) : (
            // contenedor de de la tarejatas
            <div className="bg-slate-200 py-[1vw]">
              {FiltroProductosIncompletos.map((pedido) => (
                // contenedor de cada pedido
                <div key={pedido._id} className="items-center flex flex-col space-y-[1vw]">
                  {pedido.productos.map((item) => (
                    // tarjeta

                    <div key={item._id} className="w-[88%] bg-white grid grid-cols-[20%_80%] p-[0.5vw]">
                      <div className="w-full h-full">
                        <img src={item.producto.imagen} alt={item.producto.titulo} className="w-full h-full" />
                      </div>

                      <div className="relative pl-[1vw]">
                        <EliminarProducto idProducto={item.producto._id} fetchCarrito={fetchCarrito} />
                        <p className=" text-[1.6vw] font-bold tracking-wide truncate w-[36vw]">{item.producto.titulo}</p>
                        <div className="text-[1.2vw] space-y-[0.2vw] py-[0.3vw]">
                          <p>
                            <span className="font-semibold">Cantidad:</span> {item.cantidad}
                          </p>
                          <p>
                            <span className="font-semibold">Precio:</span> ${item.producto.precio}
                          </p>
                          <p className="">
                            <span className="font-semibold">Idioma:</span> {item.producto.idioma}
                          </p>
                          <p className="">
                            <span className="font-semibold">Total del Producto:</span> {item.producto.precio * item.cantidad}
                          </p>
                        </div>
                        <Cantidad
                          idProducto={item.producto._id}
                          productoCantidad={item.cantidad}
                          stock={item.producto.stock}
                          fetchCarrito={fetchCarrito}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* contenedos de todos los pedidos ya hechos */}
        <div className="">
          {FiltroProductosEntregados.length === 0 ? (
            <p>No tienes pedidos completados aun</p>
          ) : (
            <div className="space-y-[1vw]">
              {/* titulo */}
              <p className="font-bold text-[1.8vw]">Pedidos Completos o Cancelados:</p>
              {/* conntenedor de cada pedido coompletado */}
              {FiltroProductosEntregados.map((pedido) => (
                <div key={pedido._id} className="items-center bg-slate-200 flex gap-[1vw] flex-col py-[1vw]">
                  {pedido.productos.map((item) => (
                    // tarjeta
                    <div key={item._id} className="w-[88%] bg-white grid grid-cols-[20%_80%] gap-[1vw] p-[0.5vw]">
                      <div className="w-full h-full">
                        <img src={item.producto.imagen} alt={item.producto.titulo} className="w-full h-full" />
                      </div>

                      <div className="pl-[1vw]">
                        <p className=" text-[1.6vw] font-bold tracking-wide truncate w-[36vw]">{item.producto.titulo}</p>
                        <div className="text-[1.2vw] space-y-[0.2vw] py-[0.3vw]">
                          <p>
                            <span className="font-semibold">Cantidad:</span> {item.cantidad}
                          </p>
                          <p>
                            <span className="font-semibold">Precio:</span> ${item.producto.precio}
                          </p>
                          <p className="">
                            <span className="font-semibold">Idioma:</span> {item.producto.idioma}
                          </p>
                          <p className="font-semibold">Descripcion:</p>
                          <p className="text-[1vw] bg-slate-100 px-[0.5vw] w-[97%] overflow-auto h-[8vw]">{item.producto.descripcion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}

function EliminarProducto({ idProducto, fetchCarrito }) {
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
      className="text-red-700 font-semibold absolute right-[0.5vw] top-[0.5vw] border-[0.2vw] border-red-600 rounded px-[1vw] hover:scale-105 transition ease-in-out duration-200"
    >
      Eliminar
    </button>
  );
}

function MasUnproducto({ idProduct, cantidad, desactivar, fetchCarrito }) {
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
      className={`${desactivar ? "bg-slate-200" : "bg-green-100"} w-[1.2vw] h-[2vw] flex justify-center items-center rounded`}
    >
      <SlArrowRight className={`${desactivar ? "text-slate-600" : "text-green-800"} text-[1.4vw]`} />
    </button>
  );
}

function MenosUnproducto({ idProduct, cantidad, desactivar, fetchCarrito }) {
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
      className={`${desactivar ? "bg-slate-200" : "bg-green-100"} w-[1.2vw] h-[2vw] flex justify-center items-center rounded`}
    >
      <SlArrowLeft className={`${desactivar ? "text-slate-600" : "text-green-800"} text-[1.4vw]`} />
    </button>
  );
}

function Cantidad({ idProducto, productoCantidad, stock, fetchCarrito }) {
  return (
    <div className="flex gap-[0.5vw] border-[0.1vw] py-[0.3vw] px-[0.3vw] rounded-[0.5vw] absolute right-0 bottom-0">
      <MenosUnproducto idProduct={idProducto} cantidad={productoCantidad} desactivar={productoCantidad <= 1} fetchCarrito={fetchCarrito} />
      <p className="flex text-[1.2vw] items-center">Cantidad: {productoCantidad}</p>

      <MasUnproducto idProduct={idProducto} cantidad={productoCantidad} desactivar={productoCantidad >= stock} fetchCarrito={fetchCarrito} />
    </div>
  );
}
