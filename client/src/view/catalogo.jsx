import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "@fontsource/baloo-2/700.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PiArrowFatLineLeftFill } from "react-icons/pi";

export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation();
  const [isFiltered, setIsFiltered] = useState(false);

  const urlActual = window.location.href;
  const urlLibros = `http://localhost:5173/catalogo?query=libros`;
  const urlManga = `http://localhost:5173/catalogo?query=mangas`;
  const urlComics = `http://localhost:5173/catalogo?query=comics`;
  const urlMercancia = `http://localhost:5173/catalogo?query=mercancia`;

  // Boton Favoritos
  function BotonFavoritos() {
    const [activo, setActivo] = useState(false);

    const ManejoClic = () => {
      setActivo(!activo);
    };

    return (
      <button className="absolute right-[1vw] text-red-500 top-[0.4vw]" onClick={ManejoClic}>
        {activo ? <FaHeart className="text-[1.4vw]" /> : <FaRegHeart className="text-[1.4vw]" />}
      </button>
    );
  }

  // Retorna el boton de filtros de aside
  function BotonAside({ activation, evento, text, traerProduct }) {
    return (
      <button
        className={`${
          activation === traerProduct ? "bg-white text-purple-800 justify-center" : "bg-gray-300 text-slate-700 pl-[1vw] justify-start "
        } w-full text-[1.1vw] flex items-center h-[2vw] rounded`}
        onClick={() => evento(traerProduct)}
      >
        {text}
      </button>
    );
  }

  // retorna el boton de volver a ver todos los libos
  function botonVolver() {
    if (!isFiltered) {
      return null; // No retorna nada si no está filtrado
    }

    if (urlActual === urlLibros) {
      return (
        <a className="flex items-center justify-center gap-[0.5vw] group" href={urlLibros}>
          <PiArrowFatLineLeftFill className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
          <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los libros</span>
        </a>
      );
    } else if (urlActual === urlManga) {
      return (
        <a className="flex items-center justify-center gap-[0.5vw] group" href={urlManga}>
          <PiArrowFatLineLeftFill className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
          <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los mangas</span>
        </a>
      );
    } else if (urlActual === urlComics) {
      return (
        <a className="flex items-center justify-center gap-[0.5vw] group" href={urlComics}>
          <PiArrowFatLineLeftFill className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
          <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los comics</span>
        </a>
      );
    } else if (urlActual === urlMercancia) {
      return (
        <a className="flex items-center justify-center gap-[0.5vw] group" href={urlMercancia}>
          <PiArrowFatLineLeftFill className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
          <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver toda la mercancia</span>
        </a>
      );
    } else {
      console.log("no se encontró la ruta para el aside");
      return null;
    }
  }

  // trae todos los libros
  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get("query");
    if (tipo) {
      fetchProductos(tipo);
    }
  }, [location]);

  // fetch para trear libros y sus filtros
  const fetchProductos = async (tipo, category = null) => {
    setProductos([]);
    setIsFiltered(!!category); // Actualiza isFiltered a true si hay una categoría
    try {
      const url = category
        ? `http://localhost:3400/api/filters?query=${tipo}&categoria=${category}`
        : `http://localhost:3400/api/filters?query=${tipo}`;
      const response = await axios.get(url);
      setProductos(response.data); // Actualizar con los productos nuevos
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // funcion para que ande filtros
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const tipo = new URLSearchParams(location.search).get("query");
    fetchProductos(tipo, category);
  };

  function renderAside() {
    if (urlActual === urlLibros) {
      return <AsideLibros />;
    } else if (urlActual === urlManga) {
      return <AsideManga />;
    } else if (urlActual === urlComics) {
      return <AsideComic />;
    } else if (urlActual === urlMercancia) {
      return <AsideMercanica />;
    } else {
      console.log("no se encontro la ruta para el aside");
    }
  }

  // aside LIBRO
  function AsideLibros() {
    return (
      <>
        {/* botón Ciencia Ficción */}
        <BotonAside text={"Ciencia Ficción"} traerProduct={"ciencia ficcion"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Juveniles */}
        <BotonAside text={"Juveniles"} traerProduct={"juvenil"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Romance */}
        <BotonAside text={"Romance"} traerProduct={"romance"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Literatura Clasica */}
        <BotonAside text={"Literatura Clasica"} traerProduct={"literatura clasica"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Terror */}
        <BotonAside text={"Terror"} traerProduct={"terror"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Triller */}
        <BotonAside text={"Triller"} traerProduct={"triller"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Infatiles */}
        <BotonAside text={"Infatiles"} traerProduct={"infantiles"} evento={handleCategoryClick} activation={activeCategory} />
      </>
    );
  }

  // aside MANGA no anda las direccione porque no estan en base de datos
  function AsideManga() {
    return (
      <>
        {/* botón Shonen */}
        <BotonAside text={"Shonen"} traerProduct={"shonen"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Seinen */}
        <BotonAside text={"Seinen"} traerProduct={"seinen"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Yuri */}
        <BotonAside text={"Yuri"} traerProduct={"yuri"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Josei */}
        <BotonAside text={"Josei"} traerProduct={"josei"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Shojo */}
        <BotonAside text={"Shojo"} traerProduct={"shojo"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Boys love */}
        <BotonAside text={"Boys love"} traerProduct={"boyslove"} evento={handleCategoryClick} activation={activeCategory} />
      </>
    );
  }

  // aside COMICS no anda las direccione porque no estan en base de datos
  function AsideComic() {
    return (
      <>
        {/* botón Superhéroes */}
        <BotonAside text={"Superhéroes"} traerProduct={"superhéroes"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Ciencia Ficción */}
        <BotonAside text={"Ciencia Ficción"} traerProduct={"ciencia Ficción"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Fantasía */}
        <BotonAside text={"Fantasía"} traerProduct={"fantasía"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Romance */}
        <BotonAside text={"Romance"} traerProduct={"romance"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Terror */}
        <BotonAside text={"Terror"} traerProduct={"terror"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Comedia */}
        <BotonAside text={"Comedia"} traerProduct={"comedia"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Slice of Life */}
        <BotonAside text={"Slice of Life"} traerProduct={"slice of Life"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Histórico */}
        <BotonAside text={"Histórico"} traerProduct={"histórico"} evento={handleCategoryClick} activation={activeCategory} />
      </>
    );
  }

  // aside MERCANCIA no anda las direccione porque no estan en base de datos
  function AsideMercanica() {
    return (
      <>
        {/* botón Remeras */}
        <BotonAside text={"Remeras"} traerProduct={"Remeras"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Pines */}
        <BotonAside text={"Pines"} traerProduct={"pines"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Posters */}
        <BotonAside text={"Posters"} traerProduct={"posters"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Tazas */}
        <BotonAside text={"Tazas"} traerProduct={"tazas"} evento={handleCategoryClick} activation={activeCategory} />
        {/* botón Terror */}
      </>
    );
  }

  // boton mas informacion de la tarjeta
  function MasInfo({ id }) {
    const verDetalles = () => {
      window.location.href = `/detalles/${id}`;
    };

    return (
      <button
        onClick={verDetalles}
        className=" absolute bottom-[0.5vw] left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-slate-100 hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] transition-all ease-in-out duration-300"
      >
        Más información
      </button>
    );
  }

  // retorna el ASIDE Y MAIN
  return (
    <div className="grid grid-cols-[80%_20%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />

      <aside className="col-start-2 row-start-3" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="bg-purple-600  text-white py-[1vw] px-[2vw]  space-y-[0.5vw]">
          <p className="text-[2.5vw] ">Filtros</p>
          <div className="flex flex-col justify-center items-center gap-[1vw] ">
            {renderAside()}
            {botonVolver()}
          </div>
        </div>
      </aside>

      <main style={{ fontFamily: "'Baloo 2', system-ui" }} className="col-start-1 row-start-3 flex justify-center items-center">
        <div>
          {/* contenedor de tarjetas */}
          <div className="flex flex-wrap py-[2vw] justify-center items-center gap-[2.5vw]">
            {productos.map((producto) => (
              // tarjeta
              <div
                key={producto._id}
                className="w-[16vw] relative h-[30vw] flex flex-col rounded-lg gap-[1vw] border-[0.1vw] shadow-lg shadow-purple-300 "
              >
                {/* imagen */}
                <div className="w-auto h-[22vw] relative">
                  <img className="w-full h-full rounded-t-lg object-cover" src={producto.imagen} alt={producto.titulo} />
                  <MasInfo id={producto._id} v />
                </div>
                {/* titulo y precio */}
                <div className="pl-[1vw] relative">
                  <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
                  <BotonFavoritos />
                  <p className="text-[1.6vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
                </div>
                {/* boton */}
                <button className="bg-[#7c23c9] absolute bottom-0 w-full rounded-b-md text-slate-100 hover:text-white transition-all ease-in-out duration-300  hover:bg-[#6017a4] h-[2.3vw] text-[1.3vw] hover:text-[1.4vw]">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}
