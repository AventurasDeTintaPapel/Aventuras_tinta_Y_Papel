import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {/* contenedor tarjetas */}
      <div>
        {favorites.map((fav) => (
          // tarjetas
          <div key={fav.producto._id} className="flex bg-red-500 w-[30vw]">
            {/* imagen */}
            <div className="w-[13vw]">
              <img src={fav.producto.imagen} className="w-full h-full object-cover" alt="" />
            </div>
            {/* info */}
            <div className="w-full flex flex-col justify-around">
              <div className="">
                {/* titulo */}
                <div className="w-[15vw]">
                  <p className="truncate text-[1.8vw]">{fav.producto.titulo}</p>
                </div>

                {/* autor */}
                <p>
                  <span>Autor:</span>
                  {fav.producto.autor}
                </p>
                {/* precio */}
                <p>
                  <span>Precio:</span>
                  {fav.producto.precio}
                </p>
              </div>
              <div className="w-full bg-blue-400 h-[5vw] relative">
                <button className="absolute">Comprar</button>
                <button className="absolute right-0">Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisFavoritos;
