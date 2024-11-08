import { saveMessage } from "../controllers/chatbotcontroller.js";

const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");

    // Enviar un mensaje de bienvenida al usuario
    socket.emit(
      "message",
      "A continuación te dejamos las opciones de consultas que podes seleccionar"
    );
    sendOptions(socket); // Enviar opciones disponibles al usuario

    // Escuchar las selecciones de opciones del usuario
    socket.on("optionSelected", async (selectedOption) => {
      try {
        console.log("Opción seleccionada:", selectedOption);

        // Procesar la opción seleccionada
        let response = handleOptionSelection(selectedOption);

        // Guardar la opción seleccionada en la base de datos
        const username = "Cliente"; // Usuario predefinido
        const botUsername = "SoporteBot"; // Nombre del chatbot

        await saveMessage(selectedOption, username); // Guardar opción seleccionada
        await saveMessage(response, botUsername); // Guardar respuesta del bot

        // Enviar respuesta y opciones al cliente
        socket.emit("message", response);
        sendOptions(socket); // Volver a enviar opciones después de la selección
      } catch (e) {
        console.error("Error al procesar la opción seleccionada:", e);
      }
    });

    socket.on("disconnect", () => {
      console.log("Un usuario se ha desconectado");
    });
  });
};

// Función para enviar opciones al usuario
const sendOptions = (socket) => {
  socket.emit("options", {
    question: "Elige una opción:",
    options: [
      "Métodos de pago",
      "Envíos",
      "Devoluciones",
      "Productos agotados",
      "Otros",
    ],
  });
};

// Manejar la selección de opciones
const handleOptionSelection = (selectedOption) => {
  switch (selectedOption) {
    case "Métodos de pago":
      return "Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.";
    case "Envíos":
      return "Hacemos envíos a todas las provincias de Argentina.";
    case "Devoluciones":
      return "Puedes devolver tu producto dentro de los primeros 14 días.";
    case "Productos agotados":
      return "Puedes suscribirte para recibir una notificación cuando el producto esté disponible.";
    case "Otros":
      return (
        "Para otras consultas, puedes contactarnos directamente por WhatsApp para una atencion mas personalizada haciendo clic en el siguiente enlace: " +
        "https://wa.me/5493704266289"
      );
    default:
      return "Lo siento, no entiendo esa opción.";
  }
};

export default socketEvents;
