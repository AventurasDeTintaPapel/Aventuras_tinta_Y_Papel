import express from 'express'; 
import logger from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


// Obtén la ruta del directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

// Conectar a MongoDB
mongoose.connect("mongodb+srv://jaqueline22:Jaqueline2445@aventura.qeyjg.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});

// Definir el esquema de los mensajes
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Función para manejar preguntas y respuestas predeterminadas
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

// Maneja las conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Mensaje de bienvenida y opciones al conectar
    socket.emit('message', 'Bienvenido al chat de soporte. ¿Cómo podemos ayudarte?');
    socket.emit('options', {
        question: 'Elige una opción:',
        options: ['Métodos de pago', 'Envíos', 'Devoluciones', 'Productos agotados']
    });

    // Escuchar los nuevos mensajes
    socket.on('chat message', async (msg) => {
        try {
            const username = "Cliente"; // Usuario predefinido
            const botUsername = "SoporteBot"; // Nombre del chatbot

            if (!msg) {
                console.error('El mensaje está vacío.');
                return;
            }

            console.log('Recibiendo mensaje:', msg, 'por el usuario:', username);

            // Respuesta del bot
            const botResponse = getBotResponse(msg);

            // Guardar el mensaje del usuario en la base de datos
            const userMessage = new Message({ content: msg, username: username });
            await userMessage.save();

            // Guardar la respuesta del bot en la base de datos
            const botMessage = new Message({ content: botResponse, username: botUsername });
            await botMessage.save();

            // Emitir ambos mensajes (el del usuario y la respuesta del bot)
            socket.emit('message', botResponse);

        } catch (e) {
            console.error('Error al procesar el mensaje:', e);
        }
    });

    // Escuchar la opción seleccionada por el usuario
    socket.on('optionSelected', (selectedOption) => {
        console.log('Opción seleccionada:', selectedOption); // Agregar log para verificar la opción seleccionada
        let response;
        switch (selectedOption) {
            case 'Métodos de pago':
                response = 'Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.';
                break;
            case 'Envíos':
                response = 'Hacemos envíos a todas las provincias de Argentina.';
                break;
            case 'Devoluciones':
                response = 'Puedes devolver tu producto dentro de los primeros 14 días.';
                break;
            case 'Productos agotados':
                response = 'Puedes suscribirte para recibir una notificación cuando el producto esté disponible.';
                break;
            default:
                response = 'Lo siento, no entiendo esa opción.';
        }
        socket.emit('message', response); // Emitir el mensaje de respuesta al cliente
        sendOptions(socket); // Volver a enviar las opciones después de la respuesta
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Función para enviar las opciones al cliente
const sendOptions = (socket) => {
    socket.emit('options', {
        question: 'Elige una opción:',
        options: ['Métodos de pago', 'Envíos', 'Devoluciones', 'Productos agotados']
    });
};

app.use(logger('dev'));
app.use(express.static(join(__dirname, '..', 'client')));

app.get('/chatbot', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'chatbot.html'));
});

server.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});