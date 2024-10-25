import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "@fontsource/baloo-2/700.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los favoritos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage

      try {
        const response = await fetch("http://localhost:3400/api/favoritos/getFav", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // Agregar el token en el encabezado
          },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.msg); // Guardar mensaje de error
          return;
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError("Error en la solicitud");
      }
    };

    fetchFavorites(); // Llamar a la función
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className=" flex flex-wrap gap-[2vw] py-[2vw] justify-center">
          {favorites.length === 0 ? (
            <p>No hay productos en favoritos</p>
          ) : (
            favorites.map((fav) => (
              <div key={fav.productoInfo._id} className="w-[40vw] bg-[#F9F0F9] rounded-[0.3vw] flex">
                <div className="w-[11vw] p-[0.5vw]">
                  <img className=" rounded-[0.3vw] w-full  h-full" src={fav.productoInfo.imagen} alt="" />
                </div>
                <div className="ml-[0.5vw] flex flex-col py-[1vw] justify-between">
                  <div className="">
                    <div className="w-[26vw]">
                      <p className="text-[2vw] text-[#5F3F73] truncate">{fav.productoInfo.titulo}</p>
                    </div>
                    <p className="pl-[0.3vw] text-[#836492] text-[1.3vw]">
                      <span className="text-[#5F3F73]">Autor: </span>
                      {fav.productoInfo.autor}
                    </p>
                    <p className="pl-[0.3vw] text-[#836492] text-[1.3vw]">
                      <span className="text-[#5F3F73]">Precio:</span> ${fav.productoInfo.precio}
                    </p>
                  </div>
                  {/* botones */}
                  <div className="relative h-[3vw] w-[25vw]">
                    <button className="bottom-0  absolute bg-[#836492] text-white py-[0.5vw] px-[1vw] rounded-[0.5vw] text-[1.1vw] hover:text-[1.2vw] transition-all ease-in-out duration-300 ">
                      Comprar
                    </button>
                    <button className="bottom-0 right-[6vw] absolute border-[#836492] text-[#836492] border-[0.2vw] py-[0.35vw] px-[1vw] rounded-[0.5vw] text-[1.1vw] hover:text-[1.2vw] transition-all ease-in-out duration-300 hover:translate-x-[0.5vw]">
                      Sacar de favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
};

export default Favorites;
