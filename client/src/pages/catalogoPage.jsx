import React, { useState } from "react";
import "@fontsource/bree-serif";

import { CorazonFav } from "../components/Fav";
import { useFetchProductos } from "../hook/useFetchProductos";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BotonComprar } from "../components/objetosVariasdos";
import { useAlert } from "../hook/useAlert";

export default function Catalogo() {
  const { Product, setFilters, loading, error } = useFetchProductos();

  const [activeFilters, setActiveFilters] = useState({
    tipo: {
      todo: true,
      libro: false,
      manga: false,
      comic: false,
      mercancia: false,
    },
    categoria: {
      todo: true,
      terror: false,
      accion: false,
      fantasia: false,
      cienciaficcion: false,
    },
  });

  const ButtonFilter = ({ filtroKey, filtroValue, activeFilter, handleFilterChange, text }) => {
    return (
      <button
        className={`${activeFilter ? "bg-green-500" : "bg-red-600"} py-2 px-4 rounded`}
        onClick={() => handleFilterChange(filtroKey, filtroValue)}
      >
        {text}
      </button>
    );
  };

  // Función para manejar el cambio de filtros
  const handleFilterChange = (filtroKey, filtroValue) => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const filterCategory = updatedFilters[filtroKey];

      // Desactivar el filtro que estaba activo antes y activar el nuevo
      Object.keys(filterCategory).forEach((key) => {
        if (key === filtroValue) {
          filterCategory[key] = !filterCategory[key]; // Cambiar el estado del filtro seleccionado
        } else {
          filterCategory[key] = false; // Desactivar los demás filtros
        }
      });

      return updatedFilters;
    });

    // Actualizamos los filtros globales para el fetch de productos
    setFilters((prev) => ({
      ...prev,
      [filtroKey]: filtroValue === "todo" ? "" : filtroValue, // Si es "todo", limpiamos el filtro
    }));
  };

  // retorna el ASIDE Y MAIN
  return (
    <div className="grid grid-cols-[20%_80%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />

      {/* aside filtros */}
      <aside className=" col-start-1 row-start-3 w-[20vw] mb-[2vw]">
        <p className="font-bold mb-2">Tipos</p>
        <div className="flex flex-col gap-2">
          <ButtonFilter filtroKey="tipo" filtroValue="" activeFilter={activeFilters.tipo.todo} handleFilterChange={handleFilterChange} text="Todo" />
          <ButtonFilter
            filtroKey="tipo"
            filtroValue="libro"
            activeFilter={activeFilters.tipo.libro}
            handleFilterChange={handleFilterChange}
            text="Libros"
          />
          <ButtonFilter
            filtroKey="tipo"
            filtroValue="manga"
            activeFilter={activeFilters.tipo.manga}
            handleFilterChange={handleFilterChange}
            text="Mangas"
          />
          <ButtonFilter
            filtroKey="tipo"
            filtroValue="comic"
            activeFilter={activeFilters.tipo.comic}
            handleFilterChange={handleFilterChange}
            text="Comics"
          />
          <ButtonFilter
            filtroKey="tipo"
            filtroValue="mercancia"
            activeFilter={activeFilters.tipo.mercancia}
            handleFilterChange={handleFilterChange}
            text="Mercancia"
          />
        </div>

        {/* Categorías */}
        <p className="font-bold mt-4 mb-2">Categorías</p>
        <div className="flex flex-col gap-2">
          <ButtonFilter
            filtroKey="categoria"
            filtroValue=""
            activeFilter={activeFilters.categoria.todo}
            handleFilterChange={handleFilterChange}
            text="Todos los filtros"
          />
          <ButtonFilter
            filtroKey="categoria"
            filtroValue="terror"
            activeFilter={activeFilters.categoria.terror}
            handleFilterChange={handleFilterChange}
            text="Terror"
          />
          <ButtonFilter
            filtroKey="categoria"
            filtroValue="accion"
            activeFilter={activeFilters.categoria.accion}
            handleFilterChange={handleFilterChange}
            text="Accion"
          />
          <ButtonFilter
            filtroKey="categoria"
            filtroValue="ciencia ficcion"
            activeFilter={activeFilters.categoria.cienciaficcion}
            handleFilterChange={handleFilterChange}
            text="Ciencia ficcion"
          />
          <ButtonFilter
            filtroKey="categoria"
            filtroValue="fantasia"
            activeFilter={activeFilters.categoria.fantasia}
            handleFilterChange={handleFilterChange}
            text="Fantasia"
          />
        </div>
      </aside>

      <main className="col-start-2 row-start-3 flex flex-col">
        <div>
          {loading && <p>Cargando productos...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* contenedor de tarjetas */}
          <div className="grid grid-cols-4 px-[3vw] justify-items-center py-[2vw] gap-[2vw] ">
            {!loading &&
              !error &&
              Product.map((producto) => (
                // tarjeta
                <div
                  key={producto._id}
                  className="w-[16vw] relative h-[31.5vw] flex flex-col rounded shadow-lg hover:h-[32.5vw] hover:w-[17vw] group transition-all ease-in-out hover:translate-y-[-0.5vw] duration-300"
                >
                  {/* imagen */}
                  <div className="w-auto h-[22vw] relative">
                    <img
                      className="w-full h-full rounded-t-lg transition-all ease-in-out duration-150 object-cover"
                      src={producto.imagen}
                      alt={producto.titulo}
                    />
                    <MasInfo
                      id={producto._id}
                      text={"Mas informacion"}
                      estilos={
                        " absolute bottom-[0.5vw] font-breeSerif left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-white hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] hover:translate-y-[0.05vw] transition-all ease-in-out duration-300"
                      }
                    />
                  </div>
                  {/* titulo y precio */}
                  <div className=" h-full relative pt-[0.5vw] pl-[1vw]">
                    <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
                    <CorazonFav key={producto._id} producto={producto} estilo={"text-[#5a189a] absolute right-[1vw] top-[0.8vw] text-[1.5vw]"} />
                    <div className="flex gap-[1vw]">
                      <p className="text-[1vw] text-[#4d2b6c]">Tipo: {producto.tipo}</p>
                      <p className="text-[1vw] text-[#4d2b6c]">categoria: {producto.categoria}</p>
                    </div>

                    <p className="text-[1.4vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
                  </div>

                  {/* boton */}
                  <BotonComprar
                    producto={producto}
                    estilos={
                      "bg-[#7c23c9] absolute bottom-0 w-full rounded-b-lg transition-all ease-in-out duration-150 text-slate-100 hover:text-white hover:bg-[#6017a4] h-[2.5vw] text-[1.2vw] hover:text-[1.4vw] group-hover:h-[3vw] transition-all easy-in-out duration-300"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </main>
      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}

export function MasInfo({ id, estilos, text }) {
  const verDetalles = () => {
    window.location.href = `/detalles/${id}`;
  };

  return (
    <button onClick={verDetalles} className={estilos}>
      {text}
    </button>
  );
}
