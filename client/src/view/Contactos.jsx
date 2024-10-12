import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { Nav } from "../components/Nav";
import "@fontsource/baloo-2/700.css";

// input del formulario de contactos
function LabelInput({ nombreCampo, relacionId, onChange }) {
  return (
    <div className="relative mb-[1.3vw]">
      <input
        type="text"
        id={relacionId}
        onChange={onChange}
        required
        className="peer rounded-md block w-full h-[3.6vw]
        border-b-2
        pl-[0.5vw]
      border-violet-900
      bg-white
        bg-opacity-70

      text-purple-900

        focus:outline-none"
        placeholder=""
      />
      <label
        htmlFor={relacionId}
        className="absolute left-[-1.2vw] top-[-2.2vw] 
        scale-75 
        text-[1.7vw]
        transform
        transition-all duration-200 ease-in-out 

        peer-placeholder-shown:top-[0.5vw]
        peer-focus:-top-[2.2vw] 
        "
      >
        {nombreCampo}
      </label>
    </div>
  );
}

// p de info contactos
function P_infocontactos({ textSpan, textInfo }) {
  return (
    <p className="font-medium list-item ml-[1.5vw] text-[1.2vw] text-purple-900">
      <span className="font-bold">{textSpan}</span>
      {textInfo}
    </p>
  );
}

// main en general de contactos
export function Contactos() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="bg-[#f9f1ed] row-start-3">
        <div className="flex items-center justify-evenly h-full py-[4vw]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
          <div className="bg-gradient-to-r from-purple-300 to-purple-400 w-[40vw] flex flex-col gap-[2vw] px-[2vw] py-[2vw] h-auto text-[1.3vw] justify-evenly rounded-xl shadow-lg hover:shadow-xl">
            {/* titulo */}
            <p className="text-[2.5vw] text-center font-bold mb-[-1vw] text-purple-900">Contáctanos</p>

            {/* info */}
            <p className="text-violet-900 text-center leading-relaxed">
              <span className="font-semibold">Si necesitas información</span> sobre cualquiera de nuestros productos o si estás teniendo algún
              inconveniente con la compra o con la página, rellena nuestro formulario y nos pondremos en contacto lo antes posible.
              <br />
              <span className="font-semibold">¡Muchas Gracias!</span>
            </p>

            {/* contactos */}
            <div className="border-t border-purple-200 pt-[1.5vw] mt-[1.5vw]">
              <p className="font-bold text-[1.7vw] text-purple-950 ">Datos de Contacto:</p>

              <P_infocontactos textInfo={" Av. 25 de mayo 385 - Argentina-Formosa"} textSpan={"Sede central:"} />
              <P_infocontactos textInfo={" +54 370 4568974"} textSpan={"Teléfono:"} />
              <P_infocontactos textInfo={" info@aventuras.com.ar"} textSpan={"Email:"} />
            </div>
          </div>

          <form className="flex flex-col gap-[1vw] font-bold bg-gradient-to-r shadow-lg from-purple-300 to-purple-400 w-[30vw] p-[1.5vw] rounded-xl text-violet-950">
            <p className="mb-[1.4vw] text-center text-[1.3vw]">INGRESE SU DUDA O QUEJA:</p>

            <LabelInput nombreCampo={"Nombre y apellido:"} relacionId={"nombre"} />
            <LabelInput nombreCampo={"Correo Electronico:"} relacionId={"email"} />

            <div>
              <label htmlFor="mensaje" className="text-[1.2vw] ml-[0.5vw]">
                Mensaje:
              </label>
              <textarea
                className="w-full p-[0.5vw] text-[1.1vw] pl-[0.5vw] rounded-md bg-white
          bg-opacity-70 text-violet-950"
                id="mensaje"
                placeholder="Ingresa lo que nos quiera transmitir"
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-purple-800 text-fuchsia-200 text-[2vw] h-[4vw] rounded-md">
              Enviar
            </button>
          </form>
        </div>
      </main>
      <Footer colAndrow="row-start-4" />
    </div>
  );
}
