"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [publicaciones, setPublicaciones] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3400/api/publics/getPublication", {
        headers: { token: token },
      })
      .then((response) => {
        setPublicaciones(response.data.getPublics);
      })
      .catch((error) =>
        console.error("Error al obtener publicaciones:", error)
      );
  }, []);

  return (
    <div className="row-start-3">
      {publicaciones.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        <div className="grid grid-cols-4 pb-[2vw] justify-items-center space-y">
          {publicaciones.map((publicacion) => (
            <div key={publicacion._id} className="mt-[2vw]">
              <img src={publicacion.imagen} alt="Imagen de la publicación" />
              <p>{publicacion.title}</p>
              <p>{publicacion.price}</p>
              <p>{publicacion.phone}</p>
              <p>{publicacion.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
