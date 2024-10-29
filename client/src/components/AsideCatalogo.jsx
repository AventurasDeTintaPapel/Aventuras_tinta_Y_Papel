import { useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";

// ASIDE DE CATALOGO

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
        activation === traerProduct
          ? "bg-[#5c456f] w-[95%] text-white h-[3vw] font-breeSerif text-[1.4vw]"
          : "bg-slate-50 w-[90%] hover:w-[93%] shadow-asiSeccion text-[1.2vw] hover:text-[1.2vw] h-[2.5vw] hover:bg-[#f0e9f5] hover:text-[#66596f] text-[#72667a] "
      } transition-all ease-linear duration-200 rounded-[0.5vw] pl-[1vw]`}
      onClick={() => evento(traerProduct)}
    >
      {text}
    </button>
  );
}

function AsideLibros({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Terror", traerProduct: "ciencia ficcion" },
    { text: "Triller", traerProduct: "juvenil" },
    { text: "Romance", traerProduct: "romance" },
    { text: "Infantiles", traerProduct: "literatura clasica" },
    { text: "Juveniles", traerProduct: "terror" },
    { text: "Ciencia Ficción", traerProduct: "triller" },
    { text: "Literatura Clasica", traerProduct: "infantiles" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

function AsideManga({ handleCategoryClick, activeCategory }) {
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

function AsideComic({ handleCategoryClick, activeCategory }) {
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

function AsideMercanica({ handleCategoryClick, activeCategory }) {
  const items = [
    { text: "Remeras", traerProduct: "Remeras" },
    { text: "Pines", traerProduct: "pines" },
    { text: "Posters", traerProduct: "posters" },
    { text: "Tazas", traerProduct: "tazas" },
  ];

  return <AsideButtons items={items} handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
}

// Urls
function obtenerDatosUrlActual() {
  const urlActual = window.location.href;
  const urls = [
    { name: "libros", url: "http://localhost:5173/catalogo?query=libros" },
    { name: "manga", url: "http://localhost:5173/catalogo?query=mangas" },
    { name: "comics", url: "http://localhost:5173/catalogo?query=comics" },
    { name: "mercancia", url: "http://localhost:5173/catalogo?query=mercancia" },
  ];

  const matchedUrl = urls.find(({ url }) => url === urlActual);

  return matchedUrl || null;
}

// renderizado de los diferentes aside
export function renderAside(fetchProductosProp) {
  const [activeCategory, setActiveCategory] = useState(null);
  const datosurl = obtenerDatosUrlActual();

  // funcion para que ande filtros
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const tipo = new URLSearchParams(location.search).get("query");
    fetchProductosProp(tipo, category);
  };

  // RENDERIZA EL ASIDE DEPENDIENDO DE DONDE NOS ENCONTREMOS
  if (datosurl.name === "libros") {
    return <AsideLibros handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (datosurl.name === "manga") {
    return <AsideManga handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (datosurl.name === "comics") {
    return <AsideComic handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else if (datosurl.name === "mercancia") {
    return <AsideMercanica handleCategoryClick={handleCategoryClick} activeCategory={activeCategory} />;
  } else {
    console.log("No se encontró la ruta para el aside");
  }
}

// retorna el boton de volver a ver todos los libos
export function botonVolver(filtro) {
  const datosUrl = obtenerDatosUrlActual();
  if (!filtro) {
    return null; // No retorna nada si no está filtrado
  }

  const filtroVolver =
    "rounded-[0.5vw] flex justify-center items-center font-breeSerif gap-[0.5vw] border-[#d5cadb] bg-none hover:bg-[#a59aaa] hover:text-white h-[2.5vw] w-[90%] hover:border-none border-[0.15vw] text-[#9a85a3] group";

  if (datosUrl.name === "libros") {
    return (
      <a className={filtroVolver} href={datosUrl.url}>
        <IoArrowUndoSharp className="text-[1.4vw] group-hover:text-[1.5vw] transition-all ease-in-out duration-300" />
        <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los libros</span>
      </a>
    );
  } else if (datosUrl.name === "manga") {
    return (
      <a className={filtroVolver} href={datosUrl.url}>
        <IoArrowUndoSharp className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
        <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los mangas</span>
      </a>
    );
  } else if (datosUrl.name === "comics") {
    return (
      <a className={filtroVolver} href={datosUrl.url}>
        <IoArrowUndoSharp className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
        <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver todos los comics</span>
      </a>
    );
  } else if (datosUrl.name === "mercancia") {
    return (
      <a className={filtroVolver} href={datosUrl.url}>
        <IoArrowUndoSharp className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300" />
        <span className="text-[1.2vw] group-hover:text-[1.3vw] transition-all ease-in-out duration-300">Ver toda la mercancia</span>
      </a>
    );
  } else {
    console.log("no se encontró la ruta para el aside");
    return null;
  }
}
