import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const useFetchProductos = () => {
  const [productos, setProductos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const location = useLocation();

  const fetchProductos = async (tipo, category = null) => {
    setProductos([]); // Limpiamos los productos antes de hacer la llamada.
    setIsFiltered(!!category); // Actualizamos si está filtrado o no.

    try {
      const url = category
        ? `http://localhost:3400/api/filters?query=${tipo}&categoria=${category}`
        : `http://localhost:3400/api/filters?query=${tipo}`;
      const response = await axios.get(url);
      setProductos(response.data); // Actualizamos el estado de productos.
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // useEffect para realizar fetch cuando cambia la URL
  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get("query");
    if (tipo) {
      fetchProductos(tipo);
    }
  }, [location]);

  // Retornamos los productos, el estado de filtrado, y la función fetchProductos.
  return { productos, isFiltered, fetchProductos };
};
