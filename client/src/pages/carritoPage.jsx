import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Carrito() {
  const [carrito, setCarrito] = useState(null); // Usamos null para verificar si la data ha llegado
  const [error, setError] = useState(null); // Para manejar errores

  const fetchCarrito = async () => {
    try {
      const response = await fetch("http://localhost:3400/api/pedidos/");

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
  // const token = localStorage.getItem("token");

  function ButtonDelete({ productoId }) {
    const eliminarProductoCart = async () => {
      try {
        console.log("Producto ID:", productoId);

        const response = await fetch("http://localhost:3400/api/pedidos/element", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idProducto: productoId }),
        });

        if (!response.ok) {
          console.log("error del servidor");
        }
      } catch (error) {
        console.log("BotonEliminar:", error);
      }
    };

    return <button onClick={eliminarProductoCart}>Elimnar</button>;
  }

  function MasUnproducto({ idProduct, cantidad }) {
    const amount = cantidad + 1;
    const EditarProducto = async () => {
      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, idProduct }),
      });

      if (!response.ok) {
        console.log("Error al traer los productos");
      }
    };

    return <button onClick={EditarProducto}>Mas</button>;
  }

  function MenosUnproducto({ idProduct, cantidad }) {
    const amount = cantidad - 1;
    const EditarProducto = async () => {
      const response = await fetch("http://localhost:3400/api/pedidos/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, idProduct }),
      });

      if (!response.ok) {
        console.log("Error al traer los productos");
      }
    };

    return <button onClick={EditarProducto}>Menos</button>;
  }

  return (
    <div>
      <h2>Carrito</h2>
      <p>Estado del pedido: {carrito.estado}</p>
      <p>Pedido #: {carrito.numPedido}</p>
      <ul>
        {carrito.productos && carrito.productos.length > 0 ? (
          carrito.productos.map((producto) => (
            <li key={producto._id}>
              Producto: Cantidad: {producto.cantidad} - Precio: {producto.producto ? producto.producto.precio : "N/A"}
              <ButtonDelete productoId={producto._id} />
              <MasUnproducto idProduct={producto._id} cantidad={producto.cantidad} />
              <MenosUnproducto idProduct={producto._id} cantidad={producto.cantidad} />
            </li>
          ))
        ) : (
          <li>No hay productos en el carrito.</li>
        )}
      </ul>
    </div>
  );
}
