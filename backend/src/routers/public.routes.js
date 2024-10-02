import { createPublic } from "../controllers/public.controllers.js";
import { subirImagen } from "../../middlewares/storage.js";
import { Router } from "express";
export const publiRouter = Router();

//ruta para cargar los productos
publiRouter.post("/cargar", subirImagen.single("imagen"), createPublic);
