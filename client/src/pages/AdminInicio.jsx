import React, { useState } from "react";
import { useTraerProductosNormal } from "../hook/useFetchProductos";
import { MasInfo } from "./catalogoPage";

export default function AdminInicio() {
  const { productos, Loading } = useTraerProductosNormal();
  const [buscarProducto, setBuscarPorducto] = useState("");

  const filtroProductos = productos.filter(
    (producto) =>
      producto.titulo.toLowerCase().includes(buscarProducto.toLowerCase()) || producto.tipo.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  return (
    <div className="">
      {/* secciones */}
      <div className="sticky top-0 w-full bg-white shadow text-slate-800 font-poopins text-[1.1vw] py-[1vw] px-[1vw] font-bold tracking-wider  space-x-3 z-40">
        <a href="#comentarios" className="border-2 rounded px-[2vw] py-[0.3vw] border-slate-800">
          Comentarios
        </a>
        <a href="#publicaciones" className="border-2 rounded px-[2vw] py-[0.3vw] border-slate-800">
          Publicaciones
        </a>
      </div>

      {/* seccion de comentarios */}
      <section id="comentarios" className="scroll-mt-16 px-[2vw] py-[1vw] w-full justify-items-center">
        {/* buscador */}
        <div className="flex w-full gap-3 p-1 m-1 pb-2 items-center">
          <p className="font-poopins font-bold tracking-wide text-[1.8vw]">COMENTARIOS</p>
          <input
            className="border text-[1.2vw] border-slate-400 rounded w-full px-[1vw] py-[0.5vw]"
            type="text"
            value={buscarProducto}
            placeholder="Buscar producto por nombre o tipo ..."
            onChange={(e) => setBuscarPorducto(e.target.value)}
            name=""
            id=""
          />
        </div>

        {Loading ? (
          <p>Cargando comentarios ...</p>
        ) : (
          // contenedor de comentarios
          <div className="flex flex-col w-full rounded gap-[1vw] px-[2vw] py-[1vw] overflow-y-auto h-[30vw]">
            {filtroProductos.length > 0 ? (
              filtroProductos.map((producto, index) => (
                // tarjetas de comentarios
                <div className="font-poopins border-b border-slate-300" key={index}>
                  <div className="flex gap-[0.5vw] bg-slate-100 text-[1.2vw] px-[1vw] py-[0.5vw] font-poopins font-bold">
                    <p className="underline">Titulo:</p>
                    {producto.titulo}
                  </div>
                  <div className=" px-[1vw] py-[0.5vw]">
                    <p className="font-semibold text-[1.3vw]"> Ultimos comentarios:</p>

                    <div key={index} className="list-disc text-[1.2vw] font-poopins font-medium px-3 py-1">
                      {producto.comentarios.length > 0 ? (
                        producto.comentarios.slice(-3).map((comentario, index) => (
                          <li className="" key={index}>
                            {comentario.body}
                          </li>
                        ))
                      ) : (
                        <p className="">no hay comentarios</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos</p>
            )}
          </div>
        )}
      </section>

      <section id="publicaciones" className="px-[2vw] py-[1vw] scroll-mt-16">
        <p className="font-poopins font-bold tracking-wide text-[2vw] px-4 py-2">ULTIMAS PUBLICACIONES</p>

        {Loading ? (
          <p>Cargando publicaciones ...</p>
        ) : (
          // contenedor
          <div className="grid grid-cols-2 gap-[1.5vw] px-4 py-2">
            {productos.slice(-4).map((producto, index) => (
              // tarjetas
              <div key={index} className="h-[20vw] bg-slate-50 shadow-md space-x-[1vw] p-2 grid grid-cols-[26%_74%] rounded w-full overflow-hidden ">
                {/* imagen */}
                <div className="col-start-1">
                  <img className="w-full h-full rounded-sm object-cover" src={producto.imagen} alt={producto.titulo} />
                </div>
                {/* titulo y precio */}
                <div className="col-start-2 space-y-2 font-poopins relative">
                  {/* titulo */}
                  <div className="truncate w-[28vw] font-bold text-[1.8vw]">{producto.titulo}</div>

                  <div className="space-y-[0.5vw]">
                    {/* precio */}
                    <p className="text-[1.2vw]">
                      <span className="font-semibold">Precio: </span> ${producto.precio}
                    </p>
                    <p className="text-[1.2vw] ">
                      <span className="font-semibold">Cantidad: </span>
                      {producto.stock}
                    </p>
                    <p className="text-[1.2vw] ">
                      <span className="font-semibold">Tipo: </span>
                      {producto.tipo}
                    </p>
                    <p className="text-[1.2vw] ">
                      <span className="font-semibold">Categoria: </span> {producto.categoria}
                    </p>
                  </div>

                  <MasInfo
                    id={producto._id}
                    estilos={
                      "font-bold text-[1.3vw] bg-slate-200 text-slate-800 rounded px-[1.2vw] py-[0.5vw] absolute bottom-[0.5vw] left-[0.5vw] hover:scale-105 transition ease-in-out duration-200"
                    }
                    text={"Mas informacion"}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
