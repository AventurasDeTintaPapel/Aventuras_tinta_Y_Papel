import { useState } from "react";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

// alerta exito
export const useAlert = () => {
  const [alertaVIsible, setAlertaVisible] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  const mostrarAlerta = (mensaje) => {
    setAlertaVisible(true);
    setMensajeAlerta(mensaje);

    setTimeout(() => {
      setAlertaVisible(false);
    }, 2000);
  };

  const Alerta = alertaVIsible && (
    <div className="fixed bottom-[1vw] right-[1vw] flex justify-center items-center z-50 px-[2vw] py-[0.5vw] border shadow-xl border-green-500 rounded-[0.5vw] gap-[1vw] bg-green-50">
      <FiCheckCircle className="text-green-500 text-[1.3vw] mt-[0.2vw]" />
      <span className="text-gray-800 font-medium text-[1.2vw]">{mensajeAlerta}</span>
    </div>
  );

  return { Alerta, mostrarAlerta };
};

// Alerta favoritos
export const useAlertFav = () => {
  const [alertaVIsible, setAlertaVisible] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  const mostrarAlerta = (mensaje) => {
    setAlertaVisible(true);
    setMensajeAlerta(mensaje);

    setTimeout(() => {
      setAlertaVisible(false);
    }, 2000);
  };

  const Alerta = alertaVIsible && (
    <div className="fixed bottom-[1vw] right-[1vw] flex justify-center items-center z-50 px-[2vw] py-[0.5vw] border shadow-xl border-green-500 rounded-[0.5vw] gap-[1vw] bg-green-50">
      <FiCheckCircle className="text-green-500 text-[1.3vw] mt-[0.2vw]" />
      <span className="text-gray-800 font-medium text-[1.2vw]">{mensajeAlerta}</span>
    </div>
  );

  return { Alerta, mostrarAlerta };
};
