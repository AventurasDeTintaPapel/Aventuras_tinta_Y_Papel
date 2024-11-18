import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminProveedores() {
  const [proveedores, setProveedores] = useState([]);
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

  useEffect(() => {
    traerProveedores();
  }, []);

  return (
    <div className="font-poopins">
      <p
        className="bg-red-400 text-[1.7vw] font-bold py-[0.5vw]
      px-[1vw]"
      >
        PROVEEDORES
      </p>
      {loading && <p>Cargando proveedores. . . </p>}
      {/* contenedor */}
      <div className=" grid grid-cols-2 gap-[1vw] py-[1vw] justify-items-center">
        {proveedores.length > 0 ? (
          proveedores.map((proveedor, index) => (
            // tarjeta
            <div className=" bg-red-600 w-[70%] space-y-[0.5vw] px-[1vw] py-[0.5vw]" key={index}>
              <p className="text-[1.2vw] bg-green-300">
                <span className="font-semibold">Nombre del proveedor: </span>
                {proveedor.name}
              </p>
              <p className="text-[1.2vw] bg-green-300">
                <span className="font-semibold">Compañia del proveedor: </span>
                {proveedor.company}
              </p>
              <p className="text-[1.2vw] bg-green-300">
                <span className="font-semibold">Email del proveedor: </span>
                {proveedor.email}
              </p>
              <p className="text-[1.2vw] bg-green-300">
                <span className="font-semibold">Ciudad del proveedor: </span>
                {proveedor.address}
              </p>
              <p className="text-[1.2vw] bg-green-300">
                <span className="font-semibold">Contacto del proveedor: </span>
                {proveedor.phone}
              </p>
            </div>
          ))
        ) : (
          <p>unu</p>
        )}
      </div>
    </div>
  );
}
