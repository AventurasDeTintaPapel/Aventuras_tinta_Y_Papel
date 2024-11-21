import React, { useState } from "react";
import "@fontsource/bree-serif";

import { CorazonFav } from "../components/Fav";
import { useFetchProductos } from "../hook/useFetchProductos";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BotonComprar } from "../components/objetosVariasdos";
 // Asumo que tienes este hook para obtener los productos

export default function Catalogo() {
  const { Product, setFilters, loading, error } = useFetchProductos();

  const [buscarProducto, setBuscarProducto] = useState("");
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
      Superheroes: false,
      juvenil: false,
    },
  });

  const ButtonFilter = ({ filtroKey, filtroValue, activeFilter, handleFilterChange, text }) => {
    return (
      <button
        className={`${
          activeFilter ? "bg-purple-800 text-white" : "bg-slate-300 text-slate-600"
        } py-[0.3vw] text-[1.2vw] tracking-wider font-baloo rounded`}
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

      if (filtroValue === "") {
        Object.keys(filterCategory).forEach((key) => {
          filterCategory[key] = key === "todo";
        });
      } else {
        Object.keys(filterCategory).forEach((key) => {
          filterCategory[key] = key === filtroValue;
        });
        filterCategory.todo = false;
      }

      return updatedFilters;
    });

    setFilters((prev) => ({
      ...prev,
      [filtroKey]: filtroValue === "" ? "" : filtroValue,
    }));
  };

  // Función de filtrado para el campo de búsqueda
  const filtroProductos = Product.filter(
    (producto) =>
      producto.titulo.toLowerCase().includes(buscarProducto.toLowerCase()) ||
      producto.tipo.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  return (
    <div className="grid grid-cols-[20%_80%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />

      {/* aside filtros */}
      <aside className=" col-start-1 row-start-3 w-[20vw] space-y-[2vw] mb-[2vw] pl-[1vw] pt-[0.5vw]">
        <div className="">
        <p className="font-poopins font-bold tracking-wide text-[1.8vw]">Buscador</p>
          <input
            className="border text-[1vw] border-slate-400 rounded w-full px-[1vw] py-[0.5vw]"
            type="text"
            value={buscarProducto}
            placeholder="Buscar producto por nombre o tipo ..."
            onChange={(e) => setBuscarProducto(e.target.value)}
          />
        </div>
        <div>
          <p className="font-baloo text-[1.5vw]">Tipos:</p>
          <div className="flex flex-col gap-2">
            <ButtonFilter
              filtroKey="tipo"
              filtroValue=""
              activeFilter={activeFilters.tipo.todo}
              handleFilterChange={handleFilterChange}
              text="Todo"
            />
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
        </div>

        {/* Categorías */}
        <div>
          <p className="font-baloo text-[1.5vw]">Categorías:</p>
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
              filtroValue="cienciaficcion"
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
            <ButtonFilter
              filtroKey="categoria"
              filtroValue="Superheroes"
              activeFilter={activeFilters.categoria.Superheroes}
              handleFilterChange={handleFilterChange}
              text="Super heroes"
            />
                  <ButtonFilter
              filtroKey="categoria"
              filtroValue="juvenil"
              activeFilter={activeFilters.categoria.juvenil}
              handleFilterChange={handleFilterChange}
              text="Juvenil"
            />
          </div>
        </div>
      </aside>

      <main className="col-start-2 row-start-3 flex flex-col">
        <div>
         
          {loading && <p className="text-[#5f4d65] text-[2vw] font-baloo text-center mt-[2vw]">Cargando productos...</p>}
          {error && <p className="text-red-500 text-[2vw] font-baloo text-center mt-[2vw]">Error al traer los productos intentelo mas tarde</p>}

          {/* contenedor de tarjetas */}
          <div className="grid grid-cols-4 px-[3vw] justify-items-center py-[2vw] gap-[2vw] ">
            {!loading &&
              !error &&
              filtroProductos.map((producto) => (
                <div
                  key={producto._id}
                  className="w-[16vw] relative h-[29.5vw] flex flex-col rounded shadow-lg overflow-hidden group transform hover:scale-105 transition-all ease-in-out duration-300"
                >
                  {/* imagen */}
                  <div className="w-auto h-[22vw] relative">
                    <img
                      className="w-full h-full rounded-t-lg object-cover transition-transform transform group-hover:scale-105 duration-300"
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

                    <p className="text-[1.4vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
                  </div>

                  {/* boton */}
                  <BotonComprar
                    producto={producto}
                    estilos={"absolute bottom-0 w-full rounded-b-lg text-[1.3vw] bg-purple-800 text-white py-[0.3vw]"}
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
