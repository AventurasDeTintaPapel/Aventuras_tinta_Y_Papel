import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import React from "react";

export const CorazonFav = ({ producto, estilo, traerFav }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para saber si es favorito
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los favoritos

  // Función para obtener los favoritos desde la base de datos
  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3400/api/favoritos/getFav", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al obtener favoritos");
      }

      const data = await response.json();
      setFavorites(data.favorites); // Actualizamos el estado con los favoritos obtenidos
      const isFav = data.favorites.some((fav) => fav.producto._id === producto._id);
      setIsFavorite(isFav);
      // Verifica si el producto está marcado como favorito
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  };

  // Función para agregar un producto a favoritos
  const addToFavorites = async (idProduct) => {
    try {
      const response = await fetch("http://localhost:3400/api/favoritos/addFav", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idProduct }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al agregar a favoritos");
      }

      const data = await response.json();
      console.log("Producto agregado a favoritos:", data);
      // Volver a cargar los favoritos después de agregar uno nuevo
      fetchFavorites();
    } catch (error) {
      console.error("Error al agregar favorito:", error);
    }
  };

  // Función para eliminar un producto de favoritos
  const removeFromFavorites = async (idProduct) => {
    try {
      const response = await fetch("http://localhost:3400/api/favoritos/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idProduct }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al eliminar favorito");
      }

      const data = await response.json();
      console.log("Producto eliminado de favoritos:", data);
      // Volver a cargar los favoritos después de eliminar uno
      fetchFavorites();
      traerFav();
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  // useEffect para cargar los favoritos cuando el componente se monta
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Alternar entre agregar y eliminar de favoritos
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(producto._id); // Eliminar de favoritos
    } else {
      addToFavorites(producto._id); // Agregar a favoritos
    }
    setIsFavorite(!isFavorite); // Cambiar el estado de isFavorite
  };

  return (
    <div className={estilo}>
      <button onClick={handleFavoriteToggle}>{isFavorite ? <FaHeart /> : <FaRegHeart />}</button>
    </div>
  );
};
