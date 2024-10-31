import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/boogaloo";
import "@fontsource/bree-serif";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CorazonFav } from "../components/Fav";
import { MasInfo } from "./catalogo";
import { IconoCargando } from "../components/objetosVariasdos";

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
  }, []);

  // Renderizado condicional
  if (loading)
    return (
      <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
        <Header colAndrow={"row-start-1"} />
        <Nav colAndrow={"row-start-2"} />
        <div className="flex justify-center row-start-3 items-center bg-slate-200 py-[4vw] text-slate-600 font-boogaloo text-[7vw]">
          Cargando
          <IconoCargando />
        </div>
        <Footer colAndrow={"row-start-4"} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3">
        {/* contenedor tarjetas */}
        <div className="grid grid-cols-2 gap-y-[2vw] justify-items-center py-[2vw] h-full">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              // tarjetas
              <div key={fav.producto._id} className="flex relative font-boogaloo rounded-[1vw] shadow-fav w-[94%] h-[17vw] p-[0.6vw]">
                <CorazonFav
                  key={fav.producto._id}
                  producto={fav.producto}
                  estilo={
                    "text-[#5a189a] hover:text-[2.5vw] transition-all ease-in-out duration-300 hover:translate-x-[0.2vw] hover:translate-y-[-0.2vw] absolute right-[2vw] top-[1.8vw] text-[2vw]"
                  }
                />
                {/* imagen */}
                <div className="w-[13.7vw] h-full">
                  <img src={fav.producto.imagen} className="w-full h-full object-cover rounded-bl-[1vw] rounded-[0.6vw]" alt="" />
                </div>
                {/* info */}
                <div className="w-full flex flex-col justify-between pl-[1.5vw] py-[0.2vw] ">
                  <div>
                    {/* titulo */}
                    <div className="w-[25vw]">
                      <p className="truncate text-[#5F3F73] text-[3vw]"> {fav.producto.titulo}</p>
                    </div>

                    <div className=" w-[20vw]">
                      {/* autor */}
                      <p className="text-[1.8vw] text-[#7D608F] truncate">
                        <span className="text-[#5F3F73]">Autor: </span>
                        {fav.producto.autor}
                      </p>
                      {/* precio */}
                      <p className="text-[1.8vw] text-[#7D608F]">
                        <span className="text-[#5F3F73]">Precio: </span>
                        {fav.producto.precio}
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
                        "absolute border-[0.15vw] border-[#977aa6]  px-[1.5vw] py-[0.2vw] right-[10.5vw] rounded-[0.6vw] text-[#977aa6]  text-[1.3vw] hover:text-[1.4vw] hover:translate-x-[0.1vw] hover:translate-y-[-0.1vw] transition-all ease-in-out duration-200"
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tiene favoritos</p>
          )}
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
};

export default MisFavoritos;
