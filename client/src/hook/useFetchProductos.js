import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchProductos = () => {
  const [Product, setProductos] = useState([]); // Productos originales
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [filters, setFilters] = useState({ tipo: "", categoria: "" }); // Estado de filtros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const traerProductos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3400/api/productos");
      setProductos(response.data); // Guardamos los productos originales
      setFilteredProducts(response.data); // Inicializamos los productos filtrados
      setError(null);
    } catch (error) {
      console.error("Se produjo un error al traer los productos:", error);
      setError("No se pudieron obtener los productos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    const filtrados = Product.filter((producto) => {
      const filtroTipo = filters.tipo ? producto.tipo === filters.tipo : true;
      const filtroCategoria = filters.categoria ? producto.categoria === filters.categoria : true;
      return filtroTipo && filtroCategoria;
    });
    setFilteredProducts(filtrados);
  };

  useEffect(() => {
    traerProductos();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filters, Product]);

  return {
    Product: filteredProducts,
    setFilters,
    traerProductos,
    loading,
    error,
  };
};
