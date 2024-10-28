import { useState } from "react";
import { PiArrowFatLineLeftFill } from "react-icons/pi";

// ASIDE DE CATALOGO
const urlActual = window.location.href;
const urlLibros = `http://localhost:5173/catalogo?query=libros`;
const urlManga = `http://localhost:5173/catalogo?query=mangas`;
const urlComics = `http://localhost:5173/catalogo?query=comics`;
const urlMercancia = `http://localhost:5173/catalogo?query=mercancia`;

const AsideButtons = ({ items, handleCategoryClick, activeCategory }) => {
  return (
    <>
      {items.map((item) => (
        <BotonAside
          key={item.traerProduct}
          text={item.text}
          traerProduct={item.traerProduct}
          evento={handleCategoryClick}
          activation={activeCategory}
        />
      ))}
    </>
  );
};

// Retorna el boton de filtros de aside
function BotonAside({ activation, evento, text, traerProduct }) {
  return (
    <button
      className={`${
        activation === traerProduct ? "bg-white text-purple-800 justify-center" : "bg-gray-300 text-slate-700 pl-[1vw] justify-start "
      } w-full text-[1.1vw] flex items-center py-[0.3vw] rounded`}
      onClick={() => evento(traerProduct)}
    >
      {text}
    </button>
  );
}

export function AsideLibros({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Ciencia Ficción", traerProduct: "ciencia ficcion" },
    { text: "Juveniles", traerProduct: "juvenil" },
    { text: "Romance", traerProduct: "romance" },
    { text: "Literatura Clasica", traerProduct: "literatura clasica" },
    { text: "Terror", traerProduct: "terror" },
    { text: "Triller", traerProduct: "triller" },
    { text: "Infantiles", traerProduct: "infantiles" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

export function AsideManga({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Shonen", traerProduct: "shonen" },
    { text: "Seinen", traerProduct: "seinen" },
    { text: "Yuri", traerProduct: "yuri" },
    { text: "Josei", traerProduct: "josei" },
    { text: "Shojo", traerProduct: "shojo" },
    { text: "Boys love", traerProduct: "boyslove" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

export function AsideComic({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Superhéroes", traerProduct: "superhéroes" },
    { text: "Ciencia Ficción", traerProduct: "ciencia Ficción" },
    { text: "Fantasía", traerProduct: "fantasía" },
    { text: "Romance", traerProduct: "romance" },
    { text: "Terror", traerProduct: "terror" },
    { text: "Comedia", traerProduct: "comedia" },
    { text: "Slice of Life", traerProduct: "slice of Life" },
    { text: "Histórico", traerProduct: "histórico" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

export function AsideMercanica({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Remeras", traerProduct: "Remeras" },
    { text: "Pines", traerProduct: "pines" },
    { text: "Posters", traerProduct: "posters" },
    { text: "Tazas", traerProduct: "tazas" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

export function renderAside(fetchProductosProp) {
  const [activeCategory, setActiveCategory] = useState(null);

  // funcion para que ande filtros
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const tipo = new URLSearchParams(location.search).get("query");
    fetchProductosProp(tipo, category);
  };

  // RENDERIZA EL ASIDE DEPENDIENDO DE DONDE NOS ENCONTREMOS

  if (urlActual === urlLibros) {
    return <AsideLibros handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (urlActual === urlManga) {
    return <AsideManga handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (urlActual === urlComics) {
    return <AsideComic handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (urlActual === urlMercancia) {
    return <AsideMercanica handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else {
    console.log("no se encontro la ruta para el aside");
  }
}

// retorna el boton de volver a ver todos los libos
export function botonVolver(filtro) {
  if (!filtro) {
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
