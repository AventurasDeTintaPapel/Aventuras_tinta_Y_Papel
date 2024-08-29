import express from 'express';
import logger from 'morgan';
import { createConnection } from 'mysql2/promise';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

// Variable para la conexión a la base de datos
let connection;

// Inicializa la base de datos y la conexión
const initializeDb = async () => {
    try {
        connection = await createConnection({
            host: 'localhost',
            user: 'root',
            database: 'chat_aventuras',
            password: ''
        });

        // Crea la tabla si no existe
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                content TEXT,
                username TEXT
            )
        `);

        console.log('Base de datos inicializada.');
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err);
    }
};

// Llama a la función de inicialización
initializeDb();

// Maneja las conexiones de Socket.IO
io.on('connection', async (socket) => {
    console.log('A user has connected');
    console.log("Auth info:", socket.handshake.auth);

    if (!socket.recovered) {
        try {
            const [results] = await connection.execute(
                "SELECT id, content, username FROM messages WHERE id > ?",
                [socket.handshake.auth.serverOffset ?? 0]
            );

            results.forEach((row) => {
                socket.emit("chat message", row.content, row.id.toString(), row.username);
            });
        } catch (e) {
            console.error('Error fetching messages:', e);
        }
    }

    // Escuchar los nuevos mensajes y guardarlos en la base de datos
    socket.on('chat message', async (msg) => {
        try {
            const username = socket.handshake.auth.username ?? "anonymous";

            if (!msg || !username) {
                console.error('El mensaje o el nombre de usuario están vacíos.');
                return;
            }

            console.log('Guardando mensaje:', msg, 'por el usuario:', username);

            const [result] = await connection.execute(
                "INSERT INTO messages (content, username) VALUES (?, ?)",
                [msg, username]
            );

            const lastInsertId = result.insertId;
            console.log('Mensaje guardado con ID:', lastInsertId);

            io.emit('chat message', msg, lastInsertId.toString(), username);

        } catch (e) {
            console.error('Error al insertar mensaje:', e);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});



