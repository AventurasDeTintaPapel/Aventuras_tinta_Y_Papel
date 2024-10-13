import {
  cargarProducto,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
} from "../controllers/productos.controllers.js";
import { rolAdmVerified } from "../../middlewares/session.js";
import { subirImagen } from "../../middlewares/storage.js";
import { Router } from "express";
export const producRouter = Router();

//ruta para cargar los productos
producRouter.post(
  "/cargar",
  rolAdmVerified,
  subirImagen.single("imagen"),
  cargarProducto
);

//ruta para obtener los productos
producRouter.get("/", rolAdmVerified, obtenerProducto);

//ruta para obtener por id
producRouter.get("/:id", rolAdmVerified, obtenerProducto);

//ruta para eliminar productos
producRouter.delete("/eliminar/:id", rolAdmVerified, eliminarProducto);

//ruta para editar productos
producRouter.put(
  "/editar/:id",
  rolAdmVerified,
  subirImagen.single("imagen"),
  editarProducto
);
