import {
  createPublic,
  editPublics,
  getAllpublics,
  deletPublic,
} from "../controllers/public.controllers.js";
import { subirImagen } from "../../middlewares/storage.js";
import { Router } from "express";
export const publiRouter = Router();

//ruta para cargar los productos
publiRouter.post("/cargar", subirImagen.single("imagen"), createPublic);
//update publics
publiRouter.put("/edit/:idUser", editPublics);
//get publics
publiRouter.get("/", getAllpublics);
//delete publics
publiRouter.delete("/delete/:idUser", deletPublic);
