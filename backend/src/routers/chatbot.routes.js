import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtén la ruta del directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const chatbot = express.Router();

// Ruta para el chatbot
chatbot.get('/chatbot', (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'client', 'chatbot.jsx'));
});


