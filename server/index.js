import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import fetch from 'node-fetch'; // Asegúrate de tener `node-fetch` instalado
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

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }
});
const User = mongoose.model('User', userSchema);

// Función para obtener o crear un usuario
const getOrCreateUser = async () => {
    try {
        const res = await fetch("https://random-data-api.com/api/users/random_user");
        const { username: randomUsername } = await res.json();

        let user = await User.findOne({ username: randomUsername }).exec();
        if (!user) {
            user = new User({ username: randomUsername });
            await user.save();
        }

        return randomUsername;
    } catch (error) {
        console.error('Error al obtener o crear el usuario:', error);
        return 'anonymous'; // Valor por defecto en caso de error
    }
};

// Maneja las conexiones de Socket.IO
io.on('connection', async (socket) => {
    console.log('A user has connected');
    console.log("Auth info:", socket.handshake.auth);

    if (!socket.recovered) {
        try {
            const messages = await Message.find({
                timestamp: { $gt: socket.handshake.auth.serverOffset || new Date(0) }
            }).exec();

            messages.forEach((msg) => {
                socket.emit("chat message", msg.content, msg.timestamp.toISOString(), msg.username);
            });
        } catch (e) {
            console.error('Error fetching messages:', e);
        }
    }

    // Escuchar los nuevos mensajes y guardarlos en la base de datos
    socket.on('chat message', async (msg) => {
        try {
            const username = socket.handshake.auth.username ?? await getOrCreateUser();

            if (!msg || !username) {
                console.error('El mensaje o el nombre de usuario están vacíos.');
                return;
            }

            console.log('Guardando mensaje:', msg, 'por el usuario:', username);

            const newMessage = new Message({ content: msg, username: username });
            const savedMessage = await newMessage.save();

            console.log('Mensaje guardado con ID:', savedMessage._id);

            // Emitimos el mensaje, la hora y el nombre de usuario
            io.emit('chat message', msg, savedMessage.timestamp.toISOString(), username);

        } catch (e) {
            console.error('Error al insertar mensaje:', e);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

app.use(logger('dev'));

app.use(express.static(join(__dirname, '..', 'client')));

app.get('/chat', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'index.html'));
});

server.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});











