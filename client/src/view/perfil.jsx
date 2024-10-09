import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MdOutlineSquare } from "react-icons/md";
import { FaUser } from "react-icons/fa6";

import imgPerfilonn from "../assets/img/imgPerfil.png";

import { useState, useRef, useEffect } from "react";

function CargarImagenConBoton() {
  const [imagenPrevia, setImagenPrevia] = useState(null);
  const inputFileRef = useRef(null); // Referencia al input oculto

  // Verifica si hay un token de sesión
  const tieneToken = () => {
    return localStorage.getItem("token") !== null;
  };

  const manejarCambioImagen = (event) => {
    const archivo = event.target.files[0];

    if (archivo) {
      const lector = new FileReader();

      lector.onload = (e) => {
        setImagenPrevia(e.target.result); // Almacenar la URL en el estado
      };

      lector.readAsDataURL(archivo); // Leer el archivo como una URL
    }
  };

  const manejarClickBoton = () => {
    inputFileRef.current.click(); // Disparar el click en el input file oculto
  };

  useEffect(() => {
    // Cargar la imagen guardada al iniciar
    const imagenGuardada = localStorage.getItem("imagen");
    if (imagenGuardada) {
      setImagenPrevia(imagenGuardada);
    }
  }, []);

  useEffect(() => {
    // Almacenar la imagen en localStorage solo si hay un token
    if (imagenPrevia && tieneToken()) {
      localStorage.setItem("imagen", imagenPrevia);
    }
  }, [imagenPrevia]);

  return (
    <div className="z-20 flex justify-around items-center flex-col w-full h-full">
      <input type="file" accept="image/*" ref={inputFileRef} style={{ display: "none" }} onChange={manejarCambioImagen} />

      <div className="h-[18vw] w-[18vw]">
        {imagenPrevia && (
          <img className="w-full border-[0.7vw] border-[#240046] h-full object-cover rounded-full" src={imagenPrevia} alt="Imagen Previa" />
        )}
      </div>
      <button onClick={manejarClickBoton} className="bg-[#f0e6ef] text-[1.8vw] px-[1vw] py-[0.3vw] rounded-[0.5vw]">
        Seleccionar Imagen
      </button>
    </div>
  );
}

export default CargarImagenConBoton;

// baloo
import "@fontsource/baloo-2/700.css";

export function Perfil() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />

      <main className=" relative">
        {token ? (
          <div className=" flex justify-center items-center h-[100vh] bg-slate-200 p-[2vw] " style={{ fontFamily: "'Baloo 2', system-ui" }}>
            <div className=" h-[30vw] w-[70vw] rounded-[1.5vw] grid bg-white grid-cols-[33%_68%] space-x-[2vw]">
              {/* parte1 */}
              <div className="rounded-l-[1.5vw] flex flex-col justify-center gap-[6vw] items-center relative">
                {/* imagen */}
                <div className=" absolute w-full h-full bg-gradient-to-b from-fuchsia-300 to to-purple-900 z-0 rounded-l-[1.5vw] "></div>
                <CargarImagenConBoton />
              </div>

              {/* parte2 */}
              <div className="py-[1vw] flex flex-col justify-between">
                <p className="text-[2vw] font-bold ">PERFIL DE USARIO</p>
                <div className="mr-[4vw] ml-[1vw]">
                  <div className=" flex gap-[0.5vw] h-[3.5vw] border-b-[0.1vw] border-purple-200 items-center">
                    <p className="text-[1.4vw] font-medium">Nombre de Usario: </p>
                    <span className="text-[1.3vw]">Axel Leger</span>
                  </div>
                  <div className=" flex gap-[0.5vw] h-[3.5vw] border-b-[0.1vw] border-purple-200 items-center">
                    <p className="text-[1.4vw] font-medium">Correo Electronico: </p>
                    <span className="text-[1.3vw]">axelleger2@gmail.com</span>
                  </div>
                  <div className=" flex gap-[0.5vw] h-[3.5vw] border-b-[0.1vw] border-purple-200 items-center">
                    <p className="text-[1.4vw] font-medium">Fecha de Nacimiento</p>
                    <span className="text-[1.3vw]">03-03-2005</span>
                  </div>
                  <div className=" flex gap-[0.5vw] h-[3.5vw] border-purple-200 items-center">
                    <p className="text-[1.4vw] font-medium">Contraseña: </p>
                    <span className="text-[1.3vw]">#########</span>
                  </div>
                </div>

                <Botonperfil />
              </div>
            </div>
          </div>
        ) : (
          <>
            <img className="absolute top-0 left-0 h-full w-full opacity-80" src={imgPerfilonn} alt="" />
            <div className="items-center flex justify-center h-[100vh]">
              <div
                style={{ fontFamily: "'Baloo 2', system-ui" }}
                className="px-[3vw] py-[4vw] relative bg-opacity-90 bg-[#F2E9E4] flex items-center w-[80vw] h-[40vw] rounded-[1vw]"
              >
                <FaUser className="absolute left-[9.9vw]  text-[5vw] text-[#8e808b]" />
                <MdOutlineSquare className="absolute top-[12.6vw] left-[4.8vw] animate-spin-slow  text-[15vw] text-[#C9ADA7] mb-[0.5vw]  z-10" />
                <MdOutlineSquare className="absolute top-[11.1vw] left-[3.4vw] animate-spin-slow2 text-[18vw] text-[#9A8C98] mb-[0.5vw] z-0" />
                <div className="z-20 ml-[20vw]">
                  <p className="text-[3vw] text-[#22223B]">
                    <span className="text-[4vw]">I</span>NICIA SESION PARA PODER VER PERFIL
                  </p>
                  <div className="flex items-center gap-[1vw] ">
                    <a
                      href="http://localhost:5173/login"
                      className="px-[1vw] bg-[#5E548E] text-white text-[1.2vw] pb-[0.15vw] pt-[0.35vw] rounded-full "
                    >
                      INICIAR SESION
                    </a>
                    <a
                      href="http://localhost:5173/registro"
                      className="px-[1vw] bg-[#9F86C0] text-white text-[1.2vw] pb-[0.15vw] pt-[0.35vw] rounded-full  "
                    >
                      Registrate ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

function Botonperfil() {
  const [mostrarFormulario, setmostrarFormulario] = useState(false);

  const formularioPerfil = () => {
    setmostrarFormulario(true);
  };

  return (
    <>
      <button onClick={formularioPerfil} className="w-[92%] text-center bg-purple-900 text-white h-[3vw] text-[1.4vw] font-bold rounded-[0.5vw] ">
        Editar Informacion
      </button>
      {mostrarFormulario && (
        <div>
          <div className="w-full h-full bg-black absolute opacity-50 top-0 left-0 z-20"></div>
          <div className="flex justify-center absolute left-[0vw] top-[5vw] items-center h-[100vh] w-full z-30">
            <form className="bg-orange-50 px-[2vw] py-[1vw] w-[45vw] flex flex-col gap-[1.5vw] rounded-[0.4vw]">
              {/* titulo */}
              <p className="text-[2.5vw] font-bold text-center">REGISTRATE</p>

              <div>
                <label htmlFor="email" className=" text-[1.3vw] ml-[0.4vw] font-semiboldl">
                  Nombre de Usario:
                </label>
                <input
                  className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                  required
                  type="text"
                  id="usario"
                  placeholder=" axel leger"
                />
              </div>

              <div>
                <label htmlFor="email" className=" text-[1.3vw] ml-[0.4vw] font-semiboldl">
                  Email
                </label>
                <input
                  className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                  required
                  type="email"
                  id="email"
                  placeholder="nombre@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="fecha-nacimiento" className="text-[1.3vw] ml-[0.4vw] font-semiboldl">
                  Fecha de Nacimiento
                </label>
                <input className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full" required type="date" id="fecha-nacimiento" />
              </div>

              <div>
                <label htmlFor="usuario" className="text-[1.3vw] ml-[0.4vw] font-semibold">
                  Nombre de usuario
                </label>
                <input className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full" required id="usuario" placeholder="Roberto_E" />
              </div>

              <div>
                <label htmlFor="contraseña" className="text-[1.3vw] ml-[0.4vw] font-semibold">
                  Contraseña
                </label>
                <input
                  required
                  className="h-[2.5vw] rounded-[0.3vw] p-[0.7vw] text-[1.5vw] w-full"
                  type="password"
                  id="contraseña"
                  placeholder="#######"
                />
              </div>

              <div className="flex justify-center gap-[1vw]">
                <button
                  className="bg-red-900 h-[3.5vw] text-white font-bold text-[1.6vw] rounded-[0.3vw] w-[50%] hover:bg-red-800 hover:text-[1.8vw] transition-all ease-linear duration-150 "
                  type="button"
                >
                  Resetear
                </button>
                <button
                  className="bg-red-900 h-[3.5vw] text-white font-bold text-[1.6vw] rounded-[0.3vw] w-[50%] hover:bg-red-800 hover:text-[1.8vw] transition-all ease-linear duration-150 "
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
