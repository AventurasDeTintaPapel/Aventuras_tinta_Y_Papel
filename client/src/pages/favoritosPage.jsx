import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/boogaloo";
import "@fontsource/bree-serif";
import { CorazonFav } from "../components/Fav";
import { MasInfo } from "./catalogoPage";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function MisFavoritos() {
  const [favorites, setFavorites] = useState([]); // Estado para favoritos
  const [loading, setLoading] = useState(true); // Estado para manejar carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Efecto para obtener los favoritos
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true); // Iniciar la carga
        const response = await axios.get(
          "http://localhost:3400/api/favoritos/getFav",
          {
            withCredentials: true, // Enviar cookies con la solicitud
          }
        );
        setFavorites(response.data.favorites || []); // Actualizar favoritos
      } catch (err) {
        setError(err.response?.data?.msg || "Error al cargar favoritos");
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchFavorites();
  }, []);

  // Renderizado principal
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto]">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3">
        {/* Contenedor tarjetas */}
        <div className="grid grid-cols-2 gap-y-[2vw] justify-items-center py-[2vw] h-full">
          {loading ? (
            <p className="text-center text-[2vw] text-gray-600">Cargando favoritos...</p>
          ) : error ? (
            <p className="text-center text-[2vw] text-red-600">{error}</p>
          ) : favorites.length > 0 ? (
            favorites.map((fav) => (
              // Tarjetas
              <div
                key={fav.producto._id}
                className="flex relative font-boogaloo rounded-[1vw] shadow-fav w-[45vw] h-[17vw] p-[0.6vw]"
              >
                <CorazonFav
                  key={fav.producto._id}
                  producto={fav.producto}
                  estilo={
                    "text-[#5a189a] hover:text-[2.5vw] transition-all ease-in-out duration-300 hover:translate-x-[0.2vw] hover:translate-y-[-0.2vw] absolute right-[2vw] top-[1.8vw] text-[2vw]"
                  }
                />
                {/* Imagen */}
                <div className="w-[13.7vw] h-full">
                  <img
                    src={fav.producto.imagen}
                    className="w-full h-full object-cover rounded-bl-[1vw] rounded-[0.6vw]"
                    alt={fav.producto.titulo || "Imagen del producto"}
                  />
                </div>
                {/* Información */}
                <div className="w-full flex flex-col justify-between pl-[1.5vw] py-[0.2vw]">
                  <div>
                    {/* Título */}
                    <div className="w-[25vw]">
                      <p className="truncate text-[#5F3F73] text-[2.5vw]">
                        {fav.producto.titulo || "Título desconocido"}
                      </p>
                    </div>
                    <div className="w-[20vw]">
                      {/* Autor */}
                      <p className="text-[1.8vw] text-[#7D608F] truncate">
                        <span className="text-[#5F3F73]">Autor: </span>
                        {fav.producto.autor || "Desconocido"}
                      </p>
                      {/* Precio */}
                      <p className="text-[1.8vw] text-[#7D608F]">
                        <span className="text-[#5F3F73]">Precio: </span>
                        {fav.producto.precio ? `$${fav.producto.precio}` : "No disponible"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[2.6vw] relative font-breeSerif">
                    <button className="absolute bg-[#80658d] right-[0.8vw] px-[1.5vw] py-[0.3vw] rounded-[0.6vw] text-white text-[1.3vw] hover:bg-[#8f719e] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200">
                      Comprar
                    </button>
                    <MasInfo
                      text={"Detalles"}
                      id={fav.producto._id}
                      estilos={
                        "absolute border-[0.15vw] border-[#977aa6] px-[1.5vw] py-[0.2vw] right-[10.5vw] rounded-[0.6vw] text-[#977aa6] text-[1.3vw] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200"
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
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}
