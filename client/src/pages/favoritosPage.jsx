import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "@fontsource/boogaloo";
import "@fontsource/bree-serif";
import { CorazonFav } from "../components/Fav";
import { MasInfo } from "./catalogoPage";
import { BotonComprar } from "../components/objetosVariasdos";

export default function MisFavoritos() {
  const [favoritos, setFavorites] = useState([]); // Estado para favoritos
  const [loading, setLoading] = useState(true); // Estado para manejar carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchFavorites = async () => {
    try {
      setLoading(true); // Iniciar la carga
      const response = await axios("http://localhost:3400/api/favoritos/getFav", {
        withCredentials: true,
      });
      setFavorites(response.data);
      console.log("Se trajo favortios con exito:", response.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al cargar favoritos");
    } finally {
      setLoading(false); // Terminar la carga
    }
  };

  // Efecto para obtener los favoritos
  useEffect(() => {
    fetchFavorites();
  }, []);

  console.log(favoritos.favorites);

  // Renderizado principal
  return (
    <main className="row-start-3 font-poopins">
      {/* Contenedor tarjetas */}
      <div className="grid grid-cols-2 gap-y-[2vw] justify-items-center py-[2vw] h-full">
        {loading ? (
          <p className="text-center text-[2vw] text-gray-600">Cargando favoritos...</p>
        ) : error ? (
          <p className="text-center text-[2vw] text-red-600">{error}</p>
        ) : favoritos.favorites.length > 0 ? (
          favoritos.favorites.map((fav) => (
            // Tarjetas
            <div key={fav.producto._id} className="flex relative  rounded-[0.5vw] shadow-fav w-[45vw] h-[17vw] p-[0.6vw]">
              <CorazonFav
                key={fav.producto._id}
                producto={fav.producto}
                traerFav={fetchFavorites}
                estilo={
                  "text-[#5a189a] hover:text-[2.5vw] transition-all ease-in-out duration-300 hover:translate-x-[0.2vw] hover:translate-y-[-0.2vw] absolute right-[2vw] top-[1.8vw] text-[2vw]"
                }
              />
              {/* Imagen */}
              <div className="w-[13.7vw] h-full">
                <img
                  src={fav.producto.imagen}
                  className="w-full h-full object-cover  rounded-[0.3vw]"
                  alt={fav.producto.titulo || "Imagen del producto"}
                />
              </div>
              {/* Información */}
              <div className="w-full flex flex-col justify-between pl-[1.5vw] py-[0.2vw]">
                <div>
                  {/* Título */}
                  <div className="w-[25vw]">
                    <p className="truncate text-[#5F3F73] text-[2vw]">{fav.producto.titulo || "Título desconocido"}</p>
                  </div>
                  <div className="w-[20vw]">
                    {/* Autor */}
                    <p className="text-[1.4vw] text-[#7D608F] truncate">
                      <span className="text-[#5F3F73]">Autor: </span>
                      {fav.producto.autor || "Desconocido"}
                    </p>
                    {/* Precio */}
                    <p className="text-[1.4vw] text-[#7D608F]">
                      <span className="text-[#5F3F73]">Precio: </span>
                      {fav.producto.precio ? `$${fav.producto.precio}` : "No disponible"}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[2.6vw] relative font-breeSerif">
                  <BotonComprar
                    producto={fav.producto}
                    estilos={
                      "absolute bg-[#80658d] right-[0.8vw] px-[1.5vw] py-[0.3vw] rounded-[0.6vw] text-white text-[1.3vw] hover:bg-[#8f719e] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200"
                    }
                  />
                  <MasInfo
                    text={"Detalles"}
                    id={fav.producto._id}
                    estilos={
                      "absolute border-[0.15vw] border-[#977aa6] px-[1.5vw] py-[0.2vw] right-[14.5vw] rounded-[0.6vw] text-[#977aa6] text-[1.3vw] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200"
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[2vw] text-gray-600">No tiene favoritos</p>
        )}
      </div>
    </main>
  );
}
