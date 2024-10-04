import Message from '../models/messages.js';

const botResponses = {
    "hola": "¡Hola! ¿En qué puedo ayudarte?",
    "precio": "Nuestros precios varían según el producto. ¿De qué producto te gustaría saber más?",
    "envio": "Ofrecemos envío gratuito en compras superiores a $50.",
    "metodos de pago": "Aceptamos pagos con tarjetas de crédito, débito, PayPal, y transferencias bancarias. También tenemos la opción de pago en efectivo en puntos habilitados",
    "adios": "¡Gracias por contactarnos! Que tengas un buen día."
};

const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMsg.includes(key)) {
            return response;
        }
    }
    return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
};

const saveMessage = async (msg, username) => {
    const message = new Message({ content: msg, username });
    await message.save();
};

export { getBotResponse, saveMessage };
