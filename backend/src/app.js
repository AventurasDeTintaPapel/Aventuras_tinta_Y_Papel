//dependencias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "./database/db.js";
import { authRouter } from "./routers/auth.routes.js";
import { pedido } from "./routers/pedido.routes.js";
import { producRouter } from "./routers/productos.routes.js";
import { favoritos } from "./routers/fav.routes.js";
import { filRoutes } from "./routers/filter.routes.js";
import { payrouter } from "./routers/payment.routes.js";
//inicializacion de el servidor
const app = express();

//aplicacion de los middlewares
app.use(express.static("./public"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();

//rutas
app.use("/api/auth", authRouter);
app.use("/api/pedidos", pedido);
app.use("/api/productos", producRouter);
app.use("/api/favoritos", favoritos);
app.use("/api/filters", filRoutes);
app.use(payrouter);

//configuracion del puerto
const port = process.env.PORT || 3400;
app.listen(port, () => {
  console.log(
    `El servidor está funcionando en el puerto http://localhost:${port}`
  );
});
