import React, { useState } from "react";
import { useFetchProductos } from "../hook/useFetchProductos";

export function AsidePrueba({ setFilteredProducts }) {
  const { productos } = useFetchProductos();
  const [filters, setFilters] = useState({
    categoria: "all",
  });

  const filterProducts = () => {
    // Aplica los filtros sobre los productos
    return productos.filter((producto) => {
      return filters.categoria === "all" || producto.categoria === filters.categoria;
    });
  };

  const handleFilterChange = ({ categoria }) => {
    setFilters({ categoria });
    setFilteredProducts(filterProducts());
  };

  const filteredProducts = filterProducts();

  return (
    <>
      <button onClick={() => handleFilterChange("all")}>Todos</button>
      <button onClick={() => handleFilterChange("terror")}>Terror</button>
      <button onClick={() => handleFilterChange("romance")}>Romance</button>
      <button onClick={() => handleFilterChange("juvenil")}>Juvenil</button>
      <button onClick={() => handleFilterChange("thriller")}>Thriller</button>
    </>
  );
}
