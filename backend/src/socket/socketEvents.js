import { getBotResponse, saveMessage } from '../controllers/chatbotcontroller.js';

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado');

        socket.emit('message', 'Bienvenido al chat de soporte. ¿Cómo podemos ayudarte?');
        sendOptions(socket);

        socket.on('chat message', async (msg) => {
            try {
                const username = "Cliente"; // Usuario predefinido
                const botUsername = "SoporteBot"; // Nombre del chatbot

                if (!msg) {
                    console.error('El mensaje está vacío.');
                    return;
                }

                console.log('Recibiendo mensaje:', msg, 'por el usuario:', username);
                const botResponse = getBotResponse(msg);
                
                await saveMessage(msg, username); // Guardar mensaje del usuario
                await saveMessage(botResponse, botUsername); // Guardar respuesta del bot

                socket.emit('message', botResponse);
            } catch (e) {
                console.error('Error al procesar el mensaje:', e);
            }
        });

        socket.on('optionSelected', (selectedOption) => {
            console.log('Opción seleccionada:', selectedOption);
            let response = handleOptionSelection(selectedOption);
            socket.emit('message', response);
            sendOptions(socket);
        });

        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });
    });
};

const sendOptions = (socket) => {
    socket.emit('options', {
        question: 'Elige una opción:',
        options: ['Métodos de pago', 'Envíos', 'Devoluciones', 'Productos agotados']
    });
};

const handleOptionSelection = (selectedOption) => {
    switch (selectedOption) {
        case 'Métodos de pago':
            return 'Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.';
        case 'Envíos':
            return 'Hacemos envíos a todas las provincias de Argentina.';
        case 'Devoluciones':
            return 'Puedes devolver tu producto dentro de los primeros 14 días.';
        case 'Productos agotados':
            return 'Puedes suscribirte para recibir una notificación cuando el producto esté disponible.';
        default:
            return 'Lo siento, no entiendo esa opción.';
    }
};

export default socketEvents;
