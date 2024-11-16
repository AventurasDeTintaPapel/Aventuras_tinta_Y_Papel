import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useAlertFav } from "../hook/useAlert";
import Cookies from "js-cookie";
// Importar cookie.js

export const CorazonFav = ({ producto, estilo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { Alerta, mostrarAlerta } = useAlertFav();

  useEffect(() => {
    // Intentar recuperar los favoritos desde las cookies
    const cookieFavorites = Cookies.get("favorites");
    if (cookieFavorites) {
      const parsedFavorites = JSON.parse(cookieFavorites); // Parseamos la cookie
      setFavorites(parsedFavorites); // Establecemos los favoritos recuperados
      const isFavorite = parsedFavorites.some((fav) => fav.producto._id === producto._id);
      setIsFavorite(isFavorite); // Verificamos si el producto está en favoritos
    } else {
      fetchFavorites(); // Si no hay cookies, realizar la llamada al backend
    }
  }, [producto._id]); // Dependencia para actualizar cuando el producto cambia

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:3400/api/favoritos/getFav", {
        withCredentials: true, // Enviar cookies con la solicitud
      });
      const favoritesData = response.data.favorites;
      setFavorites(favoritesData);
      // Guardar los favoritos en las cookies
      Cookies.set("favorites", JSON.stringify(favoritesData), { expires: 7 });
      const isFavorite = favoritesData.some((fav) => fav.producto._id === producto._id);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacer nada

    try {
      if (isFavorite) {
<<<<<<< HEAD
        // Eliminar de favoritos
        await axios.delete("http://localhost:3400/api/favoritos/delete", {
          withCredentials: true, // Enviar cookies con la solicitud
          data: { idProduct: producto._id }, // Enviar el ID del producto a eliminar
        });
        setFavorites((prev) => prev.filter((fav) => fav.producto._id !== producto._id));
        // Actualizar cookies con los favoritos restantes
        Cookies.set("favorites", JSON.stringify(favorites), { expires: 7 });
        console.log("Se eliminó con éxito");
      } else {
        // Agregar a favoritos
        await axios.post("http://localhost:3400/api/favoritos/addFav", {
          withCredentials: true,
          idProduct: producto._id,
        });
        mostrarAlerta("Se agregó correctamente a favoritos");
        const updatedFavorites = [...favorites, { producto }];
        setFavorites(updatedFavorites);
        // Actualizar cookies con los nuevos favoritos
        Cookies.set("favorites", JSON.stringify(updatedFavorites), {
          expires: 7,
        });
=======
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
>>>>>>> 62e385e5822b761e02aa020029cadc77d03be253
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    }
  };

  return (
    <div>
      {Alerta}
      <div className={estilo}>
        <button onClick={handleFavoriteToggle}>{isFavorite ? <FaHeart /> : <FaRegHeart />}</button>
      </div>
    </div>
  );
};
