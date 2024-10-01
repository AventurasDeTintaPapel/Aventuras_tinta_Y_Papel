// este es la etiqueta (a) sin despleable
function LiSinDesplegable({ textoNav, id, link }) {
  return (
    <li
      id={id}
      className="flex justify-center items-center pt-[0.5vw] pb-[1vw] px-[0.5vw]
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
        className="group-hover:font-bold group-hover:text-[1.7vw] relative flex justify-center items-center pt-[0.5vw] pb-[0.9vw] px-[0.5vw] text-[1.5vw] rounded-t-[0.5vw] group-hover:bg-purple-700"
      >
        {textoLista}
      </p>
    </a>
  );
}

// funcion para poner estilos a la pagina principal
function realizarAccionSegunPagina() {
  const reintentar = (callback, intentos = 5) => {
    // aca dice que despues de 5 intentos no pudo encontro el Id se rendira
    if (intentos === 0) {
      console.warn("No se pudo encontrar el elemento después de múltiples intentos.");
      return;
    }

    // estilos
    const estilos = "justify-center flex items-center bg-purple-100 text-purple-950 font-bold text-[1.8vw] px-[0.5vw] rounded-t-[0.5vw] h-[4vw]";

    // urlActual
    const urlActual = window.location.pathname;

    // id de las secciones de NAV
    const inicio = document.getElementById("inicioNav");
    const contacto = document.getElementById("contactoNav");
    const libro = document.getElementById("librosNav");
    const mangas = document.getElementById("MangaNav");
    const comics = document.getElementById("comicsNav");
    const merch = document.getElementById("MerchNav");
    const vender = document.getElementById("VenderNav");
    const intercambio = document.getElementById("IntercamioNav");

    // id de los desplegables

    if (inicio && contacto && libro) {
      // inicio
      if (urlActual === "/html/inicio/inicioCambiado.html") {
        inicio.classList.remove(...inicio.classList);
        inicio.className = estilos;
      }
      // contacto
      else if (urlActual === "/html/contacto.html") {
        contacto.classList.remove(...contacto.classList);
        contacto.className = estilos;
      }
      // libro
      else if (urlActual === "/html/productos/ProductosLibros.html") {
        const desplegablelibro = document.getElementById("desplegableLibro");
        desplegablelibro.classList.remove("group-hover:block");
        libro.classList.remove(...libro.classList);
        libro.className = estilos;
      }
      // manga
      else if (urlActual === "/html/productos/ProductosMangas.html") {
        const desplegableManga = document.getElementById("desplegableManga");
        desplegableManga.classList.remove("group-hover:block");
        mangas.classList.remove(...mangas.classList);
        mangas.className = estilos;
      }
      // comics
      else if (urlActual === "/html/productos/ProductosComics.html") {
        const desplegableComic = document.getElementById("desplegableComic");
        desplegableComic.classList.remove("group-hover:block");
        comics.classList.remove(...comics.classList);
        comics.className = estilos;
      }
      // merch
      else if (urlActual === "/html/productos/ProductosMerch.html") {
        const desplegableMerch = document.getElementById("desplegableMerch");
        desplegableMerch.classList.remove("group-hover:block");
        merch.classList.remove(...merch.classList);
        merch.className = estilos;
      }
      // vender
      else if (urlActual === "#") {
        vender.classList.remove(...vender.classList);
        vender.className = estilos;
      }
      // intercambio
      else if (urlActual === "#") {
        intercambio.classList.remove(...intercambio.classList);
        intercambio.className = estilos;
      }
    } else {
      setTimeout(() => reintentar(callback, intentos - 1), 100);
    }
  };

  reintentar();
}

// esto hace que la funcion se ejecute cuando carguen todos los elementos de la pagina
document.addEventListener("DOMContentLoaded", function () {
  realizarAccionSegunPagina();
});

//NAV
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
  const handleNavigation = (tipo) => {
    // Cambia la URL sin recargar la página
    window.history.pushState(null, "", `/productos/${tipo}`);
  };

  return (
    <nav>
      <ul className="flex bg-purple-900 h-[5vw] text-white justify-evenly items-end font-medium pt-[0.7vw]">
        {/* Incio  */}
        <LiSinDesplegable textoNav={"Inicio"} id={"inicioNav"} link={"http://localhost:5173/html/inicio/inicioCambiado.html"} />

        {/* contacto Principal */}
        <LiSinDesplegable textoNav={"Contactos"} id={"contactoNav"} link={"http://localhost:5173/html/contacto.html"} />

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
          <AlistaNav textoLista={"Comics"} id={"comicsNav"} link={"http://localhost:5173/html/productos/ProductosComics.html"} />

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

//HEADER
// botones de lso iconos
function BotonHeader({ nombreStiker, linkStiker }) {
  return (
    <a href={linkStiker}>
      <i
        id="btnUsuario"
        className={`${nombreStiker} bg-slate-100 rounded-full flex items-center justify-center 
      
      /paddings/ 
      xlprimario:p-[0.8vw]
      xlsecundario:py-[45%] xlsecundario:px-[95%] 
      
      /tamaños de los botones/ 
      xlprimario:text-[1.7vw] 
      xlsecundario:text-[2vw] 
      
      /transicion hover/ 
      transition-all duration-200 ease-in-out 
      xlprimario:hover:text-[2.1vw] 
      xlsecundario:hover:text-[2.3vw]
    hover:text-purple-400`}
      ></i>
    </a>
  );
}

// contenedor header
export function Header() {
  return (
    <div
      className="flex justify-between items-center bg-purple-500
      py-[0.8vw] px-[1.5vw]"
    >
      {/* Imagen */}
      <div className="contenedorImg w-[12.5vw]">
        <img className="w-full h-full object-cover" src="../../src/assets/img/Aventuras__4_-removebg-preview2.png" alt="Logo" />
      </div>

      {/* buscador */}
      <div
        className="buscador bg-white rounded-full flex items-center relative
      
      /paddings/ 
      pl-[0.3vw] py-[0.3vw]
      
      /tamaños width y heigt/ 
      w-[50vw] h-[3.3vw] mb-[0.2vw]"
      >
        <input
          className="barradelBuscador rounded-full bg-purple-100 
          
          /tamaños de letras/ 
          text-[1.3vw] 
          font-bold 
          
          /paddings y margin/ 
          pl-[1vw]  
          
          /tamaños width y heigt/ 
          w-[90%] h-[100%]"
          type="text"
          placeholder="¿Qué desea buscar?"
        />

        <i
          className="fi-br-search absolute 
        /direcciones/
        right-[1.3vw] top-[0.7vw] 
        
        /tamaños/ 
        text-[1.5vw]"
        ></i>
      </div>

      {/* botones */}
      <div className="contendorBotone flex w-auto items-center justify-center xlprimario:gap-[1.5vw] xlsecundario:gap-[3vw]">
        <BotonHeader nombreStiker={"fi-ss-user"} linkStiker={"#"} />
        <BotonHeader nombreStiker={"fi-ss-heart"} linkStiker={"#"} />
        <BotonHeader nombreStiker={"fi-ss-shopping-cart"} linkStiker={"#"} />

        <div
          id="seccion"
          className="bg-slate-100 text-center rounded-lg font-medium
          
          /tamaño de letra/
          text-[1.25vw] 
          
          /paddins/
          py-[2.5%] px-[0.6vw] 
          
          /tansision con hovers/
          transition-all duration-300 ease-in-out hover:font-bold hover:text-[1.4vw]  hover:bg-white"
        ></div>
      </div>
    </div>
  );
}
