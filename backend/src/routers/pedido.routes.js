import { Router } from "express";
import {
  agrePedido,
  ediPedido,
  elimElem,
  elimPedido,
  obtPedido,
} from "../controllers/pedidos.controllers.js";

export const pedido = Router();

//rutas para los carritos
pedido.post("/", agrePedido);
//ruta para editar el carrito
pedido.put("/", ediPedido);
//ruta para eliminar todos los productos del carrito
pedido.delete("/", elimPedido);
//ruta para eliminar un producto del carrito
pedido.delete("elemento/:id", elimElem);
//ruta para obtener el carrito por id de usuario
pedido.get("/", obtPedido);
