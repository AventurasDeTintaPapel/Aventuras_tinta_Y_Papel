//dependencias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import {Server} from "socket.io";
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from "./database/db.js";
import socketEvents from './socket/socketEvents.js';
import logger from 'morgan';


//importacion de rutas
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

//inicializacion de el servidor
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});



//aplicacion de los middlewares
app.use(express.static("./public"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();
app.use(logger('dev'));
app.use(express.static(join(__dirname, '..', 'client')));


//rutas
app.use("/api/auth", authRouter);
app.use("/api/pedidos", pedido);
app.use("/api/productos", producRouter);
app.use("/api/favoritos", favoritos);
app.use("/api/filters", filRoutes);
app.use(payrouter);
app.use("/api/coments", comentRouter);
app.use("/api/publics", publiRouter);
app.use("/api/supplier", supRouter);
app.use('/', chatbot);

// Inicializa los eventos de Socket.IO
socketEvents(io);

//configuracion del puerto
const port = process.env.PORT || 3400;
app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto http://localhost:${port}`);
});
