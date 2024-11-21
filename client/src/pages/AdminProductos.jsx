import React from "react";
import { useTraerProductosNormal } from "../hook/useFetchProductos";
import { useNavigate } from "react-router-dom";

export default function AdminProductos() {
  const { productos } = useTraerProductosNormal();
  return (
    <div className="grid grid-cols-2 gap-[1.5vw] p-[2vw]">
      {productos.map((producto, index) => (
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

            <MasInfoAdmin id={producto._id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MasInfoAdmin({ id }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/masInfoProductosAdmin/${id}`);
  };

  return (
    <button
      className="font-bold text-[1.3vw] bg-slate-200 text-slate-800 rounded px-[1.2vw] py-[0.5vw] absolute bottom-[0.5vw] left-[0.5vw] hover:scale-105 transition ease-in-out duration-200"
      onClick={handleNavigate}
    >
      Mas Informacion
    </button>
  );
}
