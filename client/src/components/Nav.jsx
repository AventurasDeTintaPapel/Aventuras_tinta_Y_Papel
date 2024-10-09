import "@fontsource/baloo-2/700.css";
// este es la etiqueta (a) sin despleable
function LiSinDesplegable({ textoNav, id, link }) {
  return (
    <li
      id={id}
      className="flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw]
    hover:bg-purple-700  hover:font-bold hover:text-[1.7vw] rounded-t-[0.6vw] text-[1.5vw]"
    >
      <a href={link}>{textoNav}</a>
    </li>
  );
}

// esta es las partes de la (lista) que se desplegan
function AlistaNav({ textoLista, id, link }) {
  return (
    <a href={link}>
      <p
        id={id}
        className="group-hover:font-bold group-hover:text-[1.7vw] relative flex justify-center items-center pt-[0.2vw] pb-[0.4vw] px-[0.5vw] text-[1.5vw] rounded-t-[0.5vw] group-hover:bg-purple-700"
      >
        {textoLista}
      </p>
    </a>
  );
}

// categorias
function HoverNav({ texto, linkHover }) {
  return (
    <a href={linkHover}>
      <div
        className={`transition-all ease-in-out duration-200 py-[0.2vw] border-b-[0.1vw] border-purple-400

        /tamaño letra/
        text-[1.5vw]

        /tamaño/
        w-[15vw]

        /hover/
      hover:bg-purple-800 hover:font-bold 
        hover:text-[1.75vw]`}
      >
        {texto}
      </div>
    </a>
  );
}

// contenedor navegador
export function Nav() {
  return (
    <nav className="row-start-2  col-span-2" style={{ fontFamily: "'Baloo 2', system-ui" }}>
      <ul className="flex bg-purple-900 h-[3.5vw] text-white justify-evenly items-end font-medium pt-[0.7vw] border-b-[0.2vw] border-purple-700">
        {/* Incio  */}
        <LiSinDesplegable textoNav={"Inicio"} id={"inicioNav"} link={"http://localhost:5173/inicio"} />

        {/* contacto Principal */}
        <LiSinDesplegable textoNav={"Contactos"} id={"contactoNav"} link={"http://localhost:5173/contactos"} />

        {/* libro */}
        <li className="group">
          <AlistaNav
            textoLista={"Libros"}
            id={"librosNav"}
            onClick={() => handleNavigation("libros")}
            link={"http://localhost:5173/html/productos/ProductosLibros.html"}
          />
          <div id="desplegableLibro" className="z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">
            <HoverNav texto={"Terror"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Triller"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Infantiles"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Juveniles"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Romance"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Ciencia Ficcion"} linkHover={"../../../html/productos/ProductosLibros.html"} />
            <HoverNav texto={"Literatura"} linkHover={"../../../html/productos/ProductosLibros.html"} />
          </div>
        </li>

        {/* Manga */}
        <li className="group">
          <AlistaNav textoLista={"Mangas"} id={"MangaNav"} link={"http://localhost:5173/html/productos/ProductosMangas.html"} />

          <div id="desplegableManga" className="z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">
            <HoverNav texto={"Seinen"} linkHover={"../../../html/productos/ProductosMangas.html"} />
            <HoverNav texto={"Yuri"} linkHover={"../../../html/productos/ProductosMangas.html"} />
            <HoverNav texto={"Shonen"} linkHover={"../../../html/productos/ProductosMangas.html"} />
            <HoverNav texto={"Josei"} linkHover={"../../../html/productos/ProductosMangas.html"} />
            <HoverNav texto={"Shojo"} linkHover={"../../../html/productos/ProductosMangas.html"} />
          </div>
        </li>

        {/* comics  */}
        <li className="group">
          <AlistaNav textoLista={"Comics"} id={"comicsNav"} link={"http://localhost:5173/catalogo"} />

          <div id="desplegableComic" className="z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">
            <HoverNav texto={"Super Heroes"} linkHover={""} />
            <HoverNav texto={"Ciencia Ficción"} linkHover={""} />
            <HoverNav texto={"Fantasía"} linkHover={""} />
            <HoverNav texto={"Romance"} linkHover={""} />
            <HoverNav texto={"Comedia"} linkHover={""} />
            <HoverNav texto={"Slice of Life"} linkHover={""} />
            <HoverNav texto={"Histórico"} linkHover={""} />
            <HoverNav texto={"Terror"} linkHover={""} />
          </div>
        </li>

        {/* merch  */}
        <li className="group">
          <AlistaNav textoLista={"Merch"} id={"MerchNav"} link={"http://localhost:5173/html/productos/ProductosMerch.html"} />
          <div
            id="desplegableMerch"
            className="contenedorLibros z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block"
          >
            <HoverNav texto={"Ropa"} linkHover={""} />
            <HoverNav texto={"Posters"} linkHover={""} />
            <HoverNav texto={"Mochilas"} linkHover={""} />
            <HoverNav texto={"Pines"} linkHover={""} />
            <HoverNav texto={"Fundas"} linkHover={""} />
          </div>
        </li>

        {/* vender */}
        <LiSinDesplegable textoNav={"Vender"} id={"VenderNav"} link={"http://localhost:5173/html/productos/#"} />

        {/* intercambio  */}
        <LiSinDesplegable textoNav={"Intercambio"} id={"IntercamioNav"} link={"http://localhost:5173/html/productos/#"} />
      </ul>
    </nav>
  );
}
