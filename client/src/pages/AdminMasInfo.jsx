import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminMasInfo() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  const fetchProducto = async () => {
    try {
      const respose = await axios.get(`http://localhost:3400/api/productos/${id}`);
      setProducto(respose.data);
    } catch (error) {
      console.error("Error a obetener el producto:", error);
    }
  };

  console.log(producto);

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const traerUsario = async () => {
    const token = localStorage.get;
  };

  // {
  //   producto.comentarios.length > 0 ? producto.comentarios.map((comentario) => console.log(comentario.usuario)) : "nada";
  // }

  return (
    <div className=" px-[10vw] py-[2vw] font-poopins">
      <div className="grid grid-cols-[20%_80%] grid-rows-[auto_auto_auto] gap-[1vw] bg-green-400 p-[1vw]">
        <div className="col-start-1 row-start-1">
          <img className="w-full h-full" src={producto.imagen} alt="" />
        </div>
        <div className="col-start-2 row-start-1">
          <p className="truncate font-bold tracking-wide text-[2.2vw] w-[55vw]">{producto.titulo}</p>
          <div className="p-[0.5vw] text-[1.3vw] space-y-[0.5vw]">
            <p>
              <span className="font-semibold">Autor: </span>
              {producto.autor}
            </p>
            <p>
              <span className="font-semibold">Tipo: </span>
              {producto.tipo}
            </p>
            <p>
              <span className="font-semibold">Idioma: </span>
              {producto.idioma}
            </p>
            <p>
              <span className="font-semibold">Categoria: </span>
              {producto.categoria}
            </p>
            <p>
              <span className="font-semibold">Numero de edicion: </span>
              {producto.numEdiciion}
            </p>

            <p>
              <span className="font-semibold">Cantidad: </span>
              {producto.stock}
            </p>
            <p>
              <span className="font-semibold">Precio: </span>${producto.precio}
            </p>
          </div>
        </div>

        <div className="col-span-2 row-start-2">
          <p className="text-[1.5vw] font-bold tracking-wide">Descripcion:</p>
          <p className="text-[1.2vw] w-[95%] pl-[1vw]">{producto.descripcion}</p>
        </div>
        <div className="col-span-2 row-start-3">
          <p className="text-[1.5vw] font-bold tracking-wide">Comentarios</p>

          <div className="flex flex-col gap-[0.5vw]">
            {producto.comentarios.length > 0 ? (
              producto.comentarios.map((comentario, index) => (
                <div key={comentario.id || index}>
                  {" "}
                  {/* Usa comentario.id si lo tienes, o index como último recurso */}
                  <p className="bg-red-500 pl-[1vw] text-[1.3vw]">{comentario.body}</p>
                </div>
              ))
            ) : (
              <p>no hay comentarios</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
