import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/boogaloo";
import "@fontsource/bree-serif";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CorazonFav } from "../components/Fav";
import { MasInfo } from "./catalogo";

const MisFavoritos = () => {
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los favoritos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3400/api/favoritos/getFav", {
          headers: { token },
        });

        const favoritesData = response.data.favorites; // Acceder a los favoritos desde la respuesta
        setFavorites(favoritesData); // Almacenar los favoritos en el estado
      } catch (error) {
        setError(error); // Guardar el error en caso de que ocurra
      } finally {
        setLoading(false); // Cambiar el estado de loading a false
      }
    };

    fetchFavorites(); // Llamar a la función para realizar la solicitud
  }, []); // Solo se ejecuta una vez al montar el componente

  // Renderizado condicional
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3">
        {/* contenedor tarjetas */}
        <div className="flex flex-wrap justify-center items-center h-full gap-[2vw] py-[2vw]">
          {favorites.map((fav) => (
            // tarjetas
            <div key={fav.producto._id} className="flex relative font-boogaloo rounded-[1vw] shadow-fav w-[80%] h-[17vw] p-[0.6vw]">
              <CorazonFav key={fav.producto._id} producto={fav.producto} estilo={"text-[#5a189a] absolute right-[1.5vw] top-[1.3vw] text-[2vw]"} />
              {/* imagen */}
              <div className="w-[13.7vw] h-full">
                <img src={fav.producto.imagen} className="w-full h-full object-cover rounded-bl-[1vw] rounded-[0.6vw]" alt="" />
              </div>
              {/* info */}
              <div className="w-full flex flex-col justify-between pl-[1.5vw] py-[0.2vw] ">
                <div>
                  {/* titulo */}
                  <div className="w-[80%]">
                    <p className="truncate text-[#5F3F73] text-[3vw]"> {fav.producto.titulo}</p>
                  </div>

                  <div className=" w-[20vw]">
                  {/* autor */}
                    <p className="text-[20px] text-[#7D608F] truncate">
                      <span className="text-[#5F3F73]">Autor: </span>
                      {fav.producto.autor}
                    </p>
                    {/* precio */}
                    <p className="text-[20px] text-[#7D608F]">
                      <span className="text-[#5F3F73]">Precio: </span>
                      {fav.producto.precio}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[2.6vw] relative font-breeSerif">
                  <button className="absolute bg-[#8f719e] right-0 w-[8.5vw] h-[2.6vw] rounded-[0.6vw] text-white text-[1.3vw]">Comprar</button>
                  <MasInfo
                    text={"Detalles"}
                    id={fav.producto._id}
                    estilos={"absolute border-[0.15vw] border-[#977aa6] w-[7.5vw] right-[10vw] h-[2.6vw] rounded-[0.6vw] text-[#977aa6] text-[1.3vw]"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
};

export default MisFavoritos;
