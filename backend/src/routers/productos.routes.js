import {
  cargarProducto,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
} from "../controllers/productos.controllers.js";
import {
  producValidUpdate,
  producValidation,
} from "../validations/producValidations.js";
// import { rolAdmVerified } from "../../middlewares/session.js";
import { subirImagen } from "../../middlewares/storage.js";
import { Router } from "express";
export const producRouter = Router();

//ruta para cargar los productos
producRouter.post(
  "/cargar",
  producValidation,
  subirImagen.single("imagen"),
  cargarProducto
);

//ruta para obtener los productos
producRouter.get("/", obtenerProducto);

//ruta para obtener por id
producRouter.get("/:id", obtenerProducto);

//ruta para eliminar productos
producRouter.delete("/eliminar/:id", eliminarProducto);

//ruta para editar productos
producRouter.put(
  "/editar/:id",
  producValidUpdate,
  subirImagen.single("imagen"),
  editarProducto
);
