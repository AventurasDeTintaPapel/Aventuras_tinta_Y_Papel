//dependencias
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "./database/db.js";
import { authRouter } from "./routers/auth.routes.js";
import { pedido } from "./routers/pedido.routes.js";
import { producRouter } from "./routers/productos.routes.js";
import { favoritos } from "./routers/fav.routes.js";
import { sale } from "./routers/sale.routes.js";

//inicializacion de el servidor
const app = express();

//aplicacion de los middlewares
app.use(express.static("./public"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//rutas
app.use("/api/auth", authRouter);
app.use("/api/carrito", pedido);
app.use("/api/productos", producRouter);
app.use("/api/pedido", sale);
app.use("/api/favoritos", favoritos);
app.use("/api/sale", sale);
//configuracion del puerto
const port = process.env.PORT || 3400;
app.listen(port, () => {
  console.log(
    `El servidor está funcionando en el puerto http://localhost:${port}`
  );
});
