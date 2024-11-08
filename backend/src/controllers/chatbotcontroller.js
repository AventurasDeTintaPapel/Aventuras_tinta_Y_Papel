//chatbotcontrollers.js
import Message from '../models/messages.js';

const botResponses = {
    "hola": {
        response: "¡Hola! ¿En qué puedo ayudarte?",
        options: ["Precio", "Envío", "Métodos de pago", "Adiós"]
    },
    "precio": {
        response: "Nuestros precios varían según el producto. ¿De qué producto te gustaría saber más?",
        options: []  // Si no hay opciones específicas
    },
    "envio": {
        response: "Ofrecemos envío gratuito en compras superiores a $50.",
        options: []  // Si no hay opciones específicas
    },
    "metodos de pago": {
        response: "Aceptamos pagos con tarjetas de crédito, débito, PayPal, y transferencias bancarias. También tenemos la opción de pago en efectivo en puntos habilitados",
        options: []  // Si no hay opciones específicas
    },
    "adios": {
        response: "¡Gracias por contactarnos! Que tengas un buen día.",
        options: []  // Si no hay opciones específicas
    }
};

const getBotResponse = (selectedOption) => {
    const lowerOption = selectedOption.toLowerCase();
    if (botResponses[lowerOption]) {
        const { response, options } = botResponses[lowerOption];
        return { message: response, options };
    }
    return { message: "Lo siento, no entiendo esa opción.", options: [] };
};


const saveMessage = async (msg, username) => {
    const message = new Message({ content: msg, username });
    await message.save();
};

export { getBotResponse, saveMessage };
