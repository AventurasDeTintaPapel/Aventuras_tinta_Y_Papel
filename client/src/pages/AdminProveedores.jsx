import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [buscarProveedor, serBuscarProve] = useState("");
  const [loading, setLoadin] = useState(false);

  const traerProveedores = async () => {
    try {
      setLoadin(true);
      const response = await axios(" http://localhost:3400/api/supplier");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al intentar tarer proveedores", error);
    } finally {
      setLoadin(false);
    }
  };

  const imagenes = [
    "https://i.pinimg.com/736x/8f/4e/e2/8f4ee208aef6bea00eb8c648b08eaeba.jpg",
    "https://i.pinimg.com/736x/72/7e/58/727e58229b2dd131002bc4f4e2ce1e4a.jpg",
    "https://i.pinimg.com/236x/54/90/77/5490777eb24f4439b5bc547422713b3f.jpg",
    "https://i.pinimg.com/736x/67/7d/20/677d209134a2da3b0c7b8777c1da2499.jpg",
    "https://i.pinimg.com/736x/d6/02/86/d602862ec8ea3fd77ccb607b5c8bf313.jpg",
  ];

  const filtroProductos = proveedores.filter(
    (producto) =>
      producto.name.toLowerCase().includes(buscarProveedor.toLowerCase()) || producto.company.toLowerCase().includes(buscarProveedor.toLowerCase())
  );

  useEffect(() => {
    traerProveedores();
  }, []);

  return (
    <div className="font-poopins">
      <div className="bg-white shadow items-center gap-[1vw] sticky top-0 flex py-[0.5vw] px-[1vw]">
        <p className="text-[1.8vw] font-bold">PROVEEDORES</p>
        <input
          onChange={(e) => serBuscarProve(e.target.value)}
          className="border text-[1.2vw] border-slate-300 rounded w-full px-[1vw] py-[0.5vw]"
          type="text"
          placeholder="Buscar proveedor por nombre o compañia . . ."
        />
      </div>
      {loading && <p>Cargando proveedores. . . </p>}
      {/* contenedor */}
      <div className="space-y-[1.5vw] py-[1vw] justify-items-center">
        {filtroProductos.length > 0 ? (
          filtroProductos.map((proveedor, index) => (
            // tarjeta
            <div className="grid grid-cols-[20%_80%] h-[13vw] shadow-md w-[70%]">
              <div className="w-full h-[13vw] ">
                <img className="w-full h-full object-cover rounded-l-md" src={imagenes[index % imagenes.length]} alt="" />
              </div>
              <div className=" space-y-[0.5vw] px-[1vw] py-[0.5vw]" key={index}>
                <p className="text-[1.2vw] border-b pl-[0.5vw] border-slate-300 pb-[0.2vw]">
                  <span className="font-semibold">Nombre del proveedor: </span>
                  {proveedor.name}
                </p>
                <p className="text-[1.2vw] border-b pl-[0.5vw] border-slate-300 pb-[0.2vw]">
                  <span className="font-semibold">Compañia del proveedor: </span>
                  {proveedor.company}
                </p>
                <p className="text-[1.2vw] border-b pl-[0.5vw] border-slate-300 pb-[0.2vw]">
                  <span className="font-semibold">Email del proveedor: </span>
                  {proveedor.email}
                </p>

                <p className="text-[1.2vw] border-b border-slate-300 pl-[0.5vw] pb-[0.2vw]">
                  <span className="font-semibold">Contacto del proveedor: </span>
                  {proveedor.phone}
                </p>
                <p className="text-[1.2vw]  pl-[0.5vw]  pb-[0.2vw]">
                  <span className="font-semibold">Ciudad del proveedor: </span>
                  {proveedor.address}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>unu</p>
        )}
      </div>
    </div>
  );
}
