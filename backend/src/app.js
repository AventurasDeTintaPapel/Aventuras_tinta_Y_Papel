import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from "./database/db.js";
import socketEvents from './socket/socketEvents.js';
import logger from 'morgan';

// Importación de rutas
import { authRouter } from "./routers/auth.routes.js";
import { pedido } from "./routers/pedido.routes.js";
import { producRouter } from "./routers/productos.routes.js";
import { publiRouter } from "./routers/public.routes.js";
import { favoritos } from "./routers/fav.routes.js";
import { filRoutes } from "./routers/filter.routes.js";
import { payrouter } from "./routers/payment.routes.js";
import { comentRouter } from "./routers/coment.routes.js";
import { supRouter } from "./routers/supplier.routes.js";
import { chatbot } from "./routers/chatbot.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicialización del servidor
const app = express();
const server = createServer(app);

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions)); // CORS para Express

// Inicializa el servidor de Socket.IO
const io = new Server(server, {
    cors: corsOptions, // CORS para Socket.IO
});

// Aplicación de los middlewares
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();
app.use(logger('dev'));
app.use(express.static(join(__dirname, '..', 'client')));
app.use(express.static("./public")); // Asegúrate de que esta línea esté después de la configuración de CORS

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/pedidos", pedido);
app.use("/api/productos", producRouter);
app.use("/api/favoritos", favoritos);
app.use("/api/filters", filRoutes);
app.use(payrouter);
app.use("/api/coments", comentRouter);
app.use("/api/publics", publiRouter);
app.use("/api/supplier", supRouter);
app.use('/api/soporte', chatbot);

// Inicializa los eventos de Socket.IO
socketEvents(io);

// Configuración del puerto
const port = process.env.PORT || 3400;
server.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto http://localhost:${port}`);
});
