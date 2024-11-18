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
    <div className="">
      {loading && <p>Cargando proveedores. . . </p>}
      {/* contenedor */}
      <div className="">
        {proveedores.length > 0 ? (
          proveedores.map((proveedor, index) => (
            // tarjeta
            <div className="" key={index}>
              <p>{proveedor.name}</p>
              <p>{proveedor.company}</p>
              <p>{proveedor.email}</p>
              <p>{proveedor.address}</p>
              <p>{proveedor.phone}</p>
            </div>
          ))
        ) : (
          <p>unu</p>
        )}
      </div>
    </div>
  );
}
