import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { useState } from "react";
// baloo
import "@fontsource/baloo-2/700.css";

export function Perfil() {
  return (
    <>
      <Header />
      <Nav />

      <main className=" flex justify-center bg-slate-200 p-[2vw] " style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className=" h-[25vw] w-[58vw] rounded-[1.5vw] grid bg-white grid-cols-[33%_68%] space-x-[2vw]">
          {/* parte1 */}
          <div className="rounded-l-[1.5vw] flex flex-col justify-center gap-[3vw] items-center relative">
            {/* imagen */}
            <div className=" absolute w-full h-full bg-gradient-to-b from-fuchsia-300 to to-purple-900 z-0 rounded-l-[1.5vw] "></div>
            <div className="w-[15vw] h-[15vw] z-10 rounded-full border-[0.5vw] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"
                alt=""
              />
            </div>
            <button className=" z-10 w-[15vw] h-[2.5vw] rounded-[0.3vw] text-[1.3vw] font-semibold bg-white">Editar imagen</button>
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
