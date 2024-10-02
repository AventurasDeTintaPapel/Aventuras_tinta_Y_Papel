// archivo: MiBoton.jsx (o el nombre que prefieras)
import React, { useEffect } from "react";

export const direccionRegistro = "../../html/registro/login.html";
export const direccionCerrarSesion = "../../html/inicio/inicioCambiado.html";

function iniciarSeccion() {
  const token = localStorage.getItem("token");
  const seccion = document.getElementById("seccion");

  if (seccion) {
    if (!token) {
      seccion.innerHTML = `
                <a href="${direccionRegistro}">
                    <p class="usuariosOn">Iniciar Sesión</p>
                </a>
            `;
    } else {
      seccion.innerHTML = `
                <a href="${direccionCerrarSesion}">
                    <p class="usuariosOff">Cerrar Sesión</p>
                </a>
            `;

      // Agrega el evento de cierre de sesión
      const cerrarSesionLink = seccion.querySelector("a"); // Asume que el primer <a> es el de cerrar sesión
      if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          window.location.reload();
        });
      }
    }
  } else {
    console.error('El elemento con id="seccion" no fue encontrado.');
  }
}

const MyButton = () => {
  useEffect(() => {
    iniciarSeccion(); // Llama a la función al cargar el componente
  }, []);

  return (
    <button
      id="seccion"
      className="bg-purple-100 text-center rounded-lg font-medium border-r-[0.2vw] border-purple-950
        text-[1.25vw] 
        py-[2.5%] px-[0.6vw] 
        transition-all duration-300 ease-in-out hover:text-[1.35vw] text-purple-950 hover:bg-purple-50"
    >
      {/* El contenido se actualizará con `iniciarSeccion`, no es necesario incluirlo aquí */}
    </button>
  );
};

export default MyButton;

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

        {/* icono buscador */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fi-br-search absolute right-[0.4vw] top-[0.45vw] w-[2.5vw] border-r border-purple-800 rounded-full p-[0.4vw] transition-all ease-in-out duration-200 bg-purple-100 hover:w-[2.8vw] hover:top-[0.3vw]"
          >
            <g id="_01_align_center" data-name="01 align center">
              <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </g>
          </svg>
        </button>
      </div>

      {/* botones */}
      <div className="contendorBotone flex w-auto items-center justify-center xlprimario:gap-[1.5vw] xlsecundario:gap-[3vw]">
        {/* <BotonHeader nombreStiker={"fi-ss-user"} linkStiker={"#"} /> */}

        {/* Action buttons */}
        <div className="flex items-center space-x-[1.5vw]">
          <ActionButton href="#" icon="user" label="Usuario" />
          <ActionButton href="#" icon="heart" label="Favoritos" />
          <ActionButton href="#" icon="cart" label="Carrito" />
          <MyButton />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ href, icon, label }) {
  const icons = {
    user: (
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    ),
    heart: (
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25c0-2.413 1.697-4.665 4.14-5.05 2.226-.351 4.486.76 5.61 2.621 1.124-1.86 3.384-2.972 5.61-2.621 2.442.385 4.14 2.637 4.14 5.05 0 3.924-2.439 7.111-4.74 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    ),
    cart: (
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    ),
  };

  return (
    <a
      href={href}
      className="flex items-center justify-center w-[3vw] h-[3vw] rounded-full bg-purple-100 text-purple-950 border-r-[0.2vw] border-purple-900 hover:w-[3.3vw] hover:h-[3.3vw] hover:bg-purple-50 transition-all ease-in-out duration-300"
      aria-label={label}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[2vw] h-[2vw]">
        {icons[icon]}
      </svg>
    </a>
  );
}
