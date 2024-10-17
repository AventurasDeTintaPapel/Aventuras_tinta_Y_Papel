import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const location = useLocation();

  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get("query");
    if (tipo) {
      fetchProductos(tipo);
    }
  }, [location]);

  const fetchProductos = async (tipo, category = null) => {
    setIsLoading(true); // Iniciar la carga
    setProductos([]); // Limpiar productos anteriores
    try {
      const url = category
        ? `http://localhost:3400/api/filters?query=${tipo}&categoria=${category}`
        : `http://localhost:3400/api/filters?query=${tipo}`;
      const response = await axios.get(url);
      setProductos(response.data); // Actualizar con los productos nuevos
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const tipo = new URLSearchParams(location.search).get("query");
    fetchProductos(tipo, category); // Filtrar por tipo y categoría
  };

  return (
    <div className="grid grid-cols-[80%_20%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />
      <aside className="col-start-2 row-start-3">
        <div className="flex flex-col gap-[1vw]">
          <button
            className={`filter-button ${activeCategory === "ciencia ficcion" ? "active" : ""}`}
            onClick={() => handleCategoryClick("ciencia ficcion")}
          >
            Ciencia Ficción
          </button>
          <button className={`filter-button ${activeCategory === "superheroe" ? "active" : ""}`} onClick={() => handleCategoryClick("superheroe")}>
            Superhéroe
          </button>
        </div>
      </aside>

      <main className="col-start-1 row-start-3">
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : (
          <div>
            {/* Verificar si no hay productos y mostrar mensaje */}
            {productos.length === 0 ? (
              <p>No hay productos disponibles en esta categoría.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {productos.map((producto) => (
                  <div key={producto._id} className="border p-4">
                    <img className="w-full h-48 object-cover" src={producto.imagen} alt={producto.titulo} />
                    <h2 className="font-semibold">{producto.titulo}</h2>
                    <p>Categoría: {producto.categoria}</p>
                    <p>Tipo: {producto.tipo}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}
