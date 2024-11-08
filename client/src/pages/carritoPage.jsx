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
    <button onClick={() => agregarProductoAlCarrito(producto)} className="bg-purple-200 w-[2vw] h-[3.5vw] flex justify-center items-center rounded">
      <SlArrowRight className="text-[1.4vw] text-purple-800" />
    </button>
  );
}

function ArrowEliminar({ idProducto, eliminarProducto, desactivar }) {
  return (
    <button
      disabled={desactivar}
      onClick={() => eliminarProducto(idProducto)}
      className={`${desactivar ? "bg-slate-200" : " bg-purple-200"}  w-[2vw] h-[3.5vw] flex justify-center items-center rounded`}
    >
      <SlArrowLeft className={` ${desactivar ? "text-slate-600" : " text-purple-800"}  text-[1.4vw] `} />
    </button>
  );
}

function obtenerCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar elementos no válidos antes de reducir
  const carritoFiltrado = carrito.filter((producto) => producto && producto._id);

  const carritoConCantidad = carritoFiltrado.reduce((acumulador, producto) => {
    const existente = acumulador.find((item) => item._id === producto._id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acumulador.push({ ...producto, cantidad: 1 });
    }

    return acumulador;
  }, []);
  return carritoConCantidad;
}

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  const calcularTotal = (carrito) => {
    return carrito.reduce((total, producto) => {
      if (producto.precio && producto.cantidad) {
        return total + producto.precio * producto.cantidad;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    const productosCarrito = obtenerCarrito();
    setCarrito(productosCarrito);
  }, []);

  // elimina todos productos con el mismo id
  const eliminarTodosLosProductos = (idProducto) => {
    // Obtén los productos guardados del localStorage
    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || [];

    // Filtra los productos que no tienen el mismo id que el producto a eliminar
    const productosFiltrados = productosGuardados.filter((producto) => producto._id !== idProducto);

    // Guarda el nuevo array de productos en el localStorage
    localStorage.setItem("carrito", JSON.stringify(productosFiltrados));

    // Actualiza el estado del carrito (si utilizas un estado en React)
    setCarrito(obtenerCarrito());
  };

  // elimina un solo producto
  const eliminarProducto = (idProducto) => {
    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || [];

    // Asegúrate de que los productos guardados no sean nulos y tengan un _id
    const productosFiltrados = productosGuardados.filter((producto) => producto && producto._id);

    const index = productosFiltrados.findIndex((producto) => producto._id === idProducto);
    if (index !== -1) {
      // Si la cantidad es mayor que 1, solo disminuir la cantidad
      if (productosFiltrados[index].cantidad > 1) {
        productosFiltrados[index].cantidad -= 1;
      } else {
        // Si es 1, eliminarlo del carrito
        productosFiltrados.splice(index, 1);
      }

      localStorage.setItem("carrito", JSON.stringify(productosFiltrados));
      setCarrito(obtenerCarrito());
    }
  };

  // agrega un producto
  const agregarProductoAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setCarrito(obtenerCarrito());
  };

  return (
    <div className="grid grid-cols-[70%_30%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1 col-span-2"} />
      <Nav colAndrow={"row-start-2 col-span-2"} />
      <aside className="row-start-3 col-start-2 bg-gray-100 p-[1vw]">
        <div className="bg-white shadow-md p-[1vw]">
          <p className="text-[1.4vw] font-semibold mb-[1vw] text-gray-800">Resumen del Carrito</p>

          <div className="mb-[1vw]">
            <div className="flex justify-between text-[1.2vw] font-medium text-gray-700 border-b pb-[0.5vw] mb-[1vw] pr-[1.5vw]">
              <p>Producto</p>
              <p>Precio</p>
            </div>

            {carrito.length === 0 ? (
              <p className="text-gray-500 italic">El carrito está vacío</p>
            ) : (
              <div className="space-y-[1vw] px-[0.5vw]">
                {carrito.map((producto) => (
                  <div key={producto._id} className="flex gap-[0.8vw] justify-between items-center text-[1vw]">
                    <p className=" font-medium text-slate-700">{producto.cantidad}</p>
                    <span className="truncate flex-1 mr-[2vw]">{producto.titulo}</span>
                    <span className="font-medium ">${producto.precio * producto.cantidad}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-[1vw]">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span className=" text-[1.2vw]">Total:</span>
              <span className="text-green-600 text-[1.2vw]">${calcularTotal(carrito).toFixed(2)}</span>
            </div>
          </div>

          <PayPalPayment carrito={carrito} />
        </div>
      </aside>
      <main className="row-start-3 col-start-1">
        <div className="bg-blue-50 w-full h-full">
          {carrito.length === 0 ? (
            <p>El carrito está vacío </p>
          ) : (
            <div className="justify-items-center py-[2vw] space-y-[2vw]">
              {carrito.map((producto) => (
                <div key={producto._id} className="bg-white shadow-md rounded-[1vw] grid w-[60vw] grid-cols-[20%_80%] p-[1vw]">
                  <div className="w-full h-[18vw]">
                    <img className="w-full h-full rounded-[0.8vw] object-cover" src={producto.imagen} alt="" />
                  </div>
                  <div className="relative w-ful rounded-r-[0.8vw]">
                    <div className="pl-[1vw] space-y-[0.5vw]">
                      <div className="w-[80%]">
                        <p className="truncate text-[1.8vw] font-medium ">{producto.titulo}</p>
                      </div>
                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">Autor: </span>
                        {producto.autor}
                      </p>

                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">Precio individual: </span> ${producto.precio}
                      </p>
                      <p className="text-[1.3vw]">
                        <span className="text-slate-800 font-medium">Total: </span>${producto.precio * producto.cantidad}
                      </p>
                    </div>

                    <div className="flex gap-[1vw] border-[0.2vw] border-slate-2 text-slate-80000 py-[0.3vw] px-[0.3vw] rounded-[0.5vw] absolute right-0 bottom-0">
                      <ArrowEliminar desactivar={producto.cantidad <= 1} eliminarProducto={eliminarProducto} idProducto={producto._id} />
                      <p className="flex text-[1.7vw] items-center">{producto.cantidad}</p>
                      <ArrowAgregar agregarProductoAlCarrito={agregarProductoAlCarrito} producto={producto} />
                    </div>

                    <CorazonFav producto={producto} estilo={"absolute top-[0.3vw] text-[2.5vw] right-[2vw]"} />
                    <MasInfo
                      text={"Detalles"}
                      id={producto._id}
                      estilos={
                        "absolute border-[0.15vw] border-[#977aa6] bottom-0 px-[1.5vw] py-[0.3vw] left-[10vw] rounded-[0.6vw] text-[#977aa6]  text-[1.3vw] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200"
                      }
                    />
                    <button
                      onClick={() => eliminarTodosLosProductos(producto._id)}
                      className="bg-purple-900 font-medium  absolute bottom-0 left-[1vw] px-[1.3vw] tracking-wider text-[1.2vw] text-white py-[0.5vw] rounded-[0.5vw] hover:bg-purple-700 transition-all ease-in-out duration-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer colAndrow={"row-start-4 col-span-2"} />
    </div>
  );
}
