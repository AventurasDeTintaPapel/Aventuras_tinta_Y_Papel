//NAV
    // categorias
    function HoverNav({texto,linkHover,tamaño}){
      const tamañoClass = "w-[${tamaño}]"
      return <a href={linkHover}>
        <div className={`transition-all ease-in-out duration-200 py-[0.2vw] border-b-[0.1vw] border-purple-400

        /tamaño letra/
        text-[1.5vw]

        /tamaño/
        ${tamañoClass}

        /hover/
      hover:bg-purple-800 hover:font-bold 
        hover:text-[1.75vw]`}
      >
        {texto}
      </div>
      </a>
    }

    // este es la etiqueta a sin despleable
    function LiSinDesplegable({textoNav, id, link}){
      return <li id={id}>
      <a href={link} className="flex justify-center items-center 

          /*redondeado*/
          xlprimario:rounded-t-[0.6vw] text-[1.5vw]

          /padiings/
          pt-[0.5vw] pb-[1vw] px-[0.5vw]

          /hovers/ 
          hover:bg-purple-700  hover:font-bold 
          hover:text-[1.7vw]">
      {textoNav} 
      </a>
    </li>
    }

    // este la primera parte de la lista con desplegable
    function AlistaNav({textoLista}){
      return <a href="../productos/ProductosLibros.html">
      <p
        className="relative flex justify-center items-center 
        /paddings/ 
        pt-[0.5vw] pb-[0.9vw] px-[0.5vw] text-[1.5vw]

        /*redondeado*/
        rounded-t-[0.5vw]

        /hovers/ 
        group-hover:bg-purple-700  group-hover:font-bold 
        group-hover:text-[1.7vw]"
      >
        {textoLista}
      </p>
    </a>
    }
  
    // contenedor navegador
    export function Nav(){
    return  <nav>
    <ul className="flex bg-purple-900 h-[5vw] text-white justify-evenly items-end font-medium

      /tamaño de letra y padding/
      pt-[0.7vw]">

      {/* Incio  */}
      <LiSinDesplegable textoNav={"Inicio"} id={"inicioNav"} link={"http://localhost:5173/html/inicio/inicioCambiado.html"}/>

      {/* contacto Principal */}
      <LiSinDesplegable textoNav={"Contactos"} id={"contactoNav"} link={"http://localhost:5173/html/contacto.html"}/>

      {/* libro */}
      <li className="group">
      
        <AlistaNav textoLista={"Libros"}/>
        <div className="contenedorLibros z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">

          <HoverNav texto={"Terror"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Triller"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Infantiles"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Juveniles"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Romance"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Ciencia Ficcion"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>
          <HoverNav texto={"Literatura"} tamaño={"15vw"} linkHover={"../../../html/productos/ProductosLibros.html"}/>

        </div>
      </li>

      {/* Manga */}
      <li className="group">
        <AlistaNav textoLista={"Mangas"}/>
        <div className="contenedorLibros z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">
          
          <HoverNav texto={"Seinen"} tamaño={"13vw"} linkHover={"../../../html/productos/ProductosMangas.html"}/>
          <HoverNav texto={"Yuri"} tamaño={"13vw"} linkHover={"../../../html/productos/ProductosMangas.html"}/>
          <HoverNav texto={"Shonen"} tamaño={"13vw"} linkHover={"../../../html/productos/ProductosMangas.html"}/>
          <HoverNav texto={"Josei"} tamaño={"13vw"} linkHover={"../../../html/productos/ProductosMangas.html"}/>
          <HoverNav texto={"Shojo"} tamaño={"13vw"} linkHover={"../../../html/productos/ProductosMangas.html"}/>
        </div>
      </li>

      {/* comics  */}
      <li className="group">
        <AlistaNav textoLista={"Comics"}/>
        <div className="contenedorLibros z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">
          
          <HoverNav texto={"Super Heroes"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Ciencia Ficción"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Fantasía"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Romance"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Comedia"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Slice of Life"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Histórico"} tamaño={"15vw"} linkHover={""}/>
          <HoverNav texto={"Terror"} tamaño={"15vw"} linkHover={""}/>

        </div>
      </li>

    {/* merch  */}
      <li className="group">
        <AlistaNav textoLista={"Merch"}/>
        <div className="contenedorLibros z-10 bg-purple-600 bg-opacity-85 text-center w-auto absolute hidden group-hover:block">

        <HoverNav texto={"Ropa"}  tamaño={"12vw"} linkHover={""}/>
        <HoverNav texto={"Posters"}  tamaño={"12vw"}  linkHover={""}/>
        <HoverNav texto={"Mochilas"} tamaño={"12vw"}   linkHover={""}/>
        <HoverNav texto={"Pines"} tamaño={"12vw"}   linkHover={""}/>
        <HoverNav texto={"Fundas"} tamaño={"12vw"}   linkHover={""}/>

        </div>
      </li>
        
      {/* vender */}
      <LiSinDesplegable textoNav={"Vender"}/>

      {/* intercambio  */}
      <LiSinDesplegable textoNav={"Intercambio"}/>
      
    </ul>
    </nav>
    }

    //  funcion pagina principal
    function realizarAccionSegunPagina() {
      const inicio = document.getElementById("inicioNav");
      const contacto = document.getElementById("contactoNav");
    
      // pregunata si exiten los ids
      if (!inicio || !contacto) {
        console.error("No se encontraron los elementos inicioNav o contactoNav.");
        return;
      }
    
      // guarda en una variable la direccion de la pagina
      const urlActual = window.location.pathname;
    
      // condicional
      if (urlActual === '/html/inicio/inicioCambiado.html') {
        inicio.classList.add(
          "justify-center", "flex", "items-center", "bg-purple-100", "text-purple-950",
          "font-bold", "text-[1.8vw]", "px-[0.5vw]", "rounded-t-[0.5vw]", "h-[4vw]"
        );
      } else if (urlActual === '/html/contacto.html') {
        contacto.classList.add(
          "justify-center", "flex", "items-center", "bg-purple-100", "text-purple-950",
          "font-bold", "text-[1.8vw]", "px-[0.5vw]", "rounded-t-[0.5vw]", "h-[4vw]"
        );
      } else {
        console.log("Algo salió mal en la prueba del Nav");
      }
    }

    document.addEventListener("DOMContentLoaded", function() {
      realizarAccionSegunPagina();
    });
    
    

    //HEADER
    // botones de lso iconos
    function BotonHeader({nombreStiker,linkStiker}){
      return <a href={linkStiker}>
      <i id="btnUsuario" className={`${nombreStiker} bg-slate-100 rounded-full flex items-center justify-center 
      
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
    hover:text-purple-400`}></i>
    </a>
    }

    // contenedor header
    export function Header(){
      return <div className="flex justify-between items-center
      py-[0.8vw] px-[1.5vw]">
      
      {/* Imagen */}
      <div className="contenedorImg w-[12.5vw]">
        <img
          className="w-full h-full object-cover"
          src="../../src/assets/img/Aventuras__4_-removebg-preview2.png"
          alt="Logo"
        />
      </div>

      {/* buscador */}
      <div className="buscador bg-white rounded-full flex items-center relative
      
      /paddings/ 
      pl-[0.3vw] py-[0.3vw]
      
      /tamaños width y heigt/ 
      w-[50vw] h-[3.3vw] mb-[0.2vw]">
      
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
          placeholder="¿Qué desea buscar?"/>

        <i className="fi-br-search absolute 
        /direcciones/
        right-[1.3vw] top-[0.7vw] 
        
        /tamaños/ 
        text-[1.5vw]"></i>
      </div>

      {/* botones */}
      <div className="contendorBotone flex w-auto items-center justify-center xlprimario:gap-[1.5vw] xlsecundario:gap-[3vw]">

        <BotonHeader nombreStiker={"fi-ss-user"} linkStiker={"#"}/>
        <BotonHeader nombreStiker={"fi-ss-heart"} linkStiker={"#"}/>
        <BotonHeader nombreStiker={"fi-ss-shopping-cart"} linkStiker={"#"}/>

        <div id="seccion"
          className="bg-slate-100 text-center rounded-lg font-medium
          
          /tamaño de letra/
          text-[1.25vw] 
          
          /paddins/
          py-[2.5%] px-[0.6vw] 
          
          /tansision con hovers/
          transition-all duration-300 ease-in-out hover:font-bold hover:text-[1.4vw]  hover:bg-white"></div>
      </div>
    </div>

    }