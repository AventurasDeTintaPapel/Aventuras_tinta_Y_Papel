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

  function ActualizarEstado({ idPedido, estadoPedido }) {
    const handleChange = async (event) => {
      const nuevoEstado = event.target.value;
      const token = localStorage.getItem('authToken'); // Asegúrate de que el token esté en localStorage o donde lo almacenes.
  
      try {
        const response = await axios.put(
          "http://localhost:3400/api/pedidos/update", 
          {
            id: idPedido,
            state: nuevoEstado,
          },
          {
            headers: {
              token: token, // Enviar el token en la cabecera Authorization
            },
            withCredentials: true,
          }
        );
  
        // Aquí llamas a tu función traerPedidos para actualizar la vista
        await traerPedidos();
        console.log("Estado actualizado:", response.data);
      } catch (error) {
        console.error("Error al actualizar estado:", error.response || error.message);
      }
    };
  
    return (
      <select className="text-[1.2vw] pl-[0.5vw]" value={estadoPedido} onChange={handleChange} name="estado" id="estado">
        <option className="" value="">
          Seleccionar estado
        </option>
        <option className="" value="Entregado">
          Entregado
        </option>
        <option className="" value="Cancelado">
          Cancelado
        </option>
      </select>
    );
  }
  const filters = pedidos.filter((pedido) => pedido.estado !== "incompleto");

  useEffect(() => {
    traerPedidos();
  }, []);

  return (
    <div className="font-poopins">
      {loading && <p>Cargando pedidos . . .</p>}
      <div className="">
        <p className=" font-bold text-[1.7vw] shadow px-[2vw] py-[0.5vw]">Pedidos</p>
      </div>
      <div className="grid grid-cols-2 gap-[1vw] py-[1vw] justify-items-center">
        {filters.map((pedido) => (
          // tarjeta
          <div className="border border-slate-400 rounded relative px-[1vw] py-[0.5vw]" key={pedido._id}>
            <div className=" border-b pb-[0.8vw] space-y-[0.2vw] border-slate-400">
              <p className="absolute rounded-sm px-[0.5vw] py-[0.1vw] bg-slate-200 right-[0.5vw] text-[1.3vw]">pedido: #{pedido.numPedido}</p>
              <p className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Fecha del pedido: </span>
                {new Date(pedido.fecha).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Estado del pedido: </span>

                <ActualizarEstado idPedido={pedido._id} estadoPedido={pedido.estado} />
              </div>
              <p className="text-[1.2vw]">
                <span className="font-bold tracking-wide">Usuario del pedido: </span>
                {pedido.usuario}
              </p>
            </div>

            <p className="text-[1.3vw] font-semibold pt-[0.5vw]">Productos: </p>
            <div className="flex flex-col gap-[0.5vw] p-[0.5vw] overflow-auto h-[13vw] bg-slate-200 rounded">
              {/* datos el producto */}
              {pedido.productos.map(({ producto, cantidad, _id }) => (
                <div className=" bg-slate-50 rounded px-[1vw] py-[0.5vw] text-[1.05vw]" key={_id}>
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
  );
}
