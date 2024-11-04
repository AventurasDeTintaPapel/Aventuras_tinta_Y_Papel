import express from 'express';
import { getBotResponse, saveMessage } from '../controllers/chatbotcontroller.js';

const router = express.Router();

// Ruta para manejar el mensaje del chatbot
router.post('/', async (req, res) => {
    const { message } = req.body;
    
    // Guardar el mensaje del usuario
    await saveMessage(message, 'Usuario');
    
    // Obtener respuesta del bot
    const { message: botMessage, options } = getBotResponse(message);
    
    // Enviar la respuesta del bot y las opciones al cliente
    res.json({ message: botMessage, options });
});

// Ruta opcional para obtener un mensaje inicial o información del bot
router.get('/', (req, res) => {
    res.json({ message: "Bienvenido al chatbot de soporte", options: [] }); // Respuesta inicial
});

export const chatbot = router;



