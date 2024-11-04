import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const CorazonFav = ({ producto, estilo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        try {
          const response = await axios.get("http://localhost:3400/api/favoritos/getFav", {
            headers: { token },
            credentials: "include",
          });
          const favoritesData = response.data.favorites;
          setFavorites(favoritesData);
          // Verificación local
          const isFavorite = favoritesData.some((fav) => fav.producto._id === producto._id);
          setIsFavorite(isFavorite);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavorites();
  }, []); // Solo se ejecuta al montar el componente

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacer nada

    try {
      if (isFavorite) {
        // Eliminar de favoritos
        await axios.delete("http://localhost:3400/api/favoritos/delete", {
          headers: { token },
          credentials: "include",
          data: { idProduct: producto._id },
        });
        setFavorites((prev) => prev.filter((fav) => fav.producto._id !== producto._id));
        console.log("se elimino con exito");
      } else {
        // Agregar a favoritos
        await axios.post(
          "http://localhost:3400/api/favoritos/addFav",
          {
            idProduct: producto._id,
          },
          {
            headers: { token },
            credentials: "include",
          }
        );
        console.log(" se agrego con exito a favoritos");

        setFavorites((prev) => [...prev, { producto }]);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div>
      <div className={estilo}>
        <button onClick={handleFavoriteToggle}>{isFavorite ? <FaHeart /> : <FaRegHeart />}</button>
      </div>
    </div>
  );
};
