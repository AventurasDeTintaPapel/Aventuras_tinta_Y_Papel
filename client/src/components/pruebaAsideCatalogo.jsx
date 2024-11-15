import React from "react";
import { useFilters } from "../hook/useFetchProductos";

export function AsidePrueba({}) {
  const { setFilters } = useFilters();

  // // Cambiar categoria
  // const handleCategoryClick = (categoria) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     categoria,
  //   }));
  // };

  // Cambiar tipo
  const handleTypeClick = (tipo) => {
    setFilters((prevFilters) => ({
      ...prevFilters, // Mantiene las demás propiedades de filters
      tipo, // Solo actualiza la propiedad tipo
    }));
    console.log(tipo);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p>Productos:</p>
        <button onClick={() => handleTypeClick("all")}>Todos</button>
        <button onClick={() => handleTypeClick("libro")}>Libros</button>
        <button onClick={() => handleTypeClick("mangas")}>Mangas</button>
        <button onClick={() => handleTypeClick("comics")}>Comics</button>
        <button onClick={() => handleTypeClick("mercancia")}>Mercancia</button>
      </div>
      {/* <div className="flex flex-col">
        <p>Filtros:</p>
        <button onClick={() => handleCategoryClick("all")}>Todos</button>
        <button onClick={() => handleCategoryClick("terror")}>Terror</button>
        <button onClick={() => handleCategoryClick("triller")}>Triller</button>
        <button onClick={() => handleCategoryClick("super heroes")}>Super Heroes</button>
        <button onClick={() => handleCategoryClick("ciencia ficcion")}>Ciencia Ficcion</button>
        <button onClick={() => handleCategoryClick("accion")}>Accion</button>
      </div> */}
    </div>
  );
}
