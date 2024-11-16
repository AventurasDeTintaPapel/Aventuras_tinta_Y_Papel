import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useAlertFav } from "../hook/useAlert";

export const CorazonFav = ({ producto, estilo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { Alerta, mostrarAlerta } = useAlertFav();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3400/api/favoritos/getFav",
          {
            withCredentials: true, // Enviar cookies con la solicitud
          }
        );
        const favoritesData = response.data.favorites;
        setFavorites(favoritesData);
        // Verificación local
        const isFavorite = favoritesData.some(
          (fav) => fav.producto._id === producto._id
        );
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []); // Solo se ejecuta al montar el componente

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacer nada

    try {
      if (isFavorite) {
        try {
          // Eliminar de favoritos
          await axios.delete("http://localhost:3400/api/favoritos/delete", {
            withCredentials: true, // Enviar cookies con la solicitud
            data: { idProduct: producto._id }, // Enviar el ID del producto a eliminar
          });

          setFavorites((prev) =>
            prev.filter((fav) => fav.producto._id !== producto._id)
          );
          setIsFavorite(false); // Cambiar el estado local
          console.log("El producto fue eliminado de favoritos exitosamente.");
        } catch (error) {
          console.error("Error al eliminar de favoritos:", error);
        }
      } else {
        try {
          // Agregar a favoritos
          const response = await axios.post(
            "http://localhost:3400/api/favoritos/addFav",
            { idProduct: producto._id },
            { withCredentials: true } // Enviar cookies con la solicitud
          );

          if (response.status === 201) {
            mostrarAlerta("Se agregó correctamente a favoritos");
            setFavorites((prev) => [...prev, { producto }]);
            setIsFavorite(true); // Cambiar el estado local
          } else {
            console.error("No se pudo agregar el producto a favoritos.");
          }
        } catch (error) {
          console.error("Error al agregar a favoritos:", error);
        }
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div>
      {Alerta}
      <div className={estilo}>
        <button onClick={handleFavoriteToggle}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};
