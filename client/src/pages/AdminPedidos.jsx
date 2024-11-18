import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoadin] = useState(false);

  const traerPedidos = async () => {
    try {
      setLoadin(true);
      const response = await axios.get("http://localhost:3400/api/pedidos/orders");
      setPedidos(response.data);

      if (!response) {
        console.log("Error al traer los productos");
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
    } finally {
      setLoadin(false);
    }
  };

  const [estado, setEstado] = useState("completo");
  const filters = pedidos.filter((pedido) => pedido.estado === estado);

  const handleClickIncompleto = () => {
    setEstado("incompleto");
  };
  const handleClickcompleto = () => {
    setEstado("completo");
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  return (
    <div className="font-poopins">
      {loading && <p>Cargando pedidos . . .</p>}
      <div className="p-[1vw]">
        <p className=" font-bold text-[1.7vw]">Pedidos</p>
        <div className="space-x-[1vw] py-[0.5vw] ">
          <button onClick={handleClickcompleto} className="border border-slate-500 rounded px-[1vw] py-[0.3vw] text-slate-800 font-semibold">
            Completos
          </button>
          <button onClick={handleClickIncompleto} className="border border-slate-500 rounded px-[1vw] py-[0.3vw] text-slate-800 font-semibold">
            Incompletos
          </button>
        </div>
        <div className="grid grid-cols-2 gap-[1vw] ">
          {filters.map((pedido) => (
            // tarjeta
            <div className=" bg-red-500 relative px-[1vw] py-[0.5vw]" key={pedido._id}>
              <p className="absolute right-[1vw] text-[1.5vw]">pedido: #{pedido.numPedido}</p>
              <p className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Fecha del pedido: </span>
                {new Date(pedido.fecha).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Estado del pedido: </span>
                {pedido.estado}
              </p>
              <p className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Usuario del pedido: </span>
                {pedido.usuario}
              </p>
              <p className="text-[1.3vw] font-semibold">Productos: </p>
              <div className="flex flex-col gap-[0.5vw] p-[0.5vw] overflow-auto h-[13vw] bg-blue-300 ">
                {/* datos el producto */}
                {pedido.productos.map(({ producto, cantidad, _id }) => (
                  <div className=" bg-blue-200 px-[1vw] py-[0.5vw] text-[1.05vw]" key={_id}>
                    <p className="truncate w-[40vw]">
                      <span className="font-semibold">Titilo:</span> {producto.titulo}
                    </p>
                    <p>
                      <span className="font-semibold">Precio:</span> ${producto.precio}
                    </p>
                    <p>
                      <span className="font-semibold">Cantidad:</span> {cantidad}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
