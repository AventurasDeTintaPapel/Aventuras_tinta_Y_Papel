import React from "react";
import { HeaderPruebas } from "../components/prueba/HeaderPrueba";
import { NavPrueba } from "../components/prueba/NavPrueba";
import { FooterPrueba } from "../components/prueba/FooterPrueba";

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
export default function Contactos() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <HeaderPruebas colAndrow={"row-start-1"} />
      <NavPrueba colAndrow={"row-start-2"} />
      <main className="row-start-3 grid grid-rows-2 bg-red-200">
        {/* <div>
       
        <p>Contáctanos</p>

      
        <p>
          <span>Si necesitas información</span> sobre cualquiera de nuestros productos o si estás teniendo algún inconveniente con la compra o con la
          página, rellena nuestro formulario y nos pondremos en contacto lo antes posible.
          <br />
          <span>¡Muchas Gracias!</span>
        </p>

       
        <div>
          <p>Datos de Contacto:</p>

          <P_infocontactos textInfo={"Av. 25 de mayo 385 - Argentina-Formosa"} textSpan={"Sede central:"} />
          <P_infocontactos textInfo={" +54 370 4568974"} textSpan={"Teléfono:"} />
          <P_infocontactos textInfo={" info@aventuras.com.ar"} textSpan={"Email:"} />
        </div>
      </div> */}

        {/* <form>
        <p>INGRESE SU DUDA O QUEJA:</p>

        <LabelInput nombreCampo={"Nombre y apellido:"} relacionId={"nombre"} />
        <LabelInput nombreCampo={"Correo Electronico:"} relacionId={"email"} />

        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" placeholder="Ingresa lo que nos quiera transmitir" rows="3" required></textarea>
        </div>

        <button type="submit">Enviar</button>
      </form> */}
      </main>
      <FooterPrueba colAndrow={"row-start-4"} />
    </div>
  );
}
