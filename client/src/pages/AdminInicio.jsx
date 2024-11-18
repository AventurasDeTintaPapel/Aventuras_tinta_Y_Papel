import React from "react";
import { useTraerProductosNormal } from "../hook/useFetchProductos";

export default function AdminInicio() {
  const { productos } = useTraerProductosNormal();

  productos.map((producto) => {
    console.log(producto.titulo);
  });

  return (
    <div className="">
      <div className="">
        {productos.length > 0 ? (
          productos.map((producto) => {
            console.log(producto.titulo);
          })
        ) : (
          <p>no hay productos</p>
        )}
      </div>

      <p>pubiblicaciones</p>
    </div>
  );
}
