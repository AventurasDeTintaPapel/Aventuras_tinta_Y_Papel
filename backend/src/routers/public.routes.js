import {
  createPublic,
  editPublics,
  getAllpublics,
  deletPublic,
} from "../controllers/public.controllers.js";
import { sessionVerified, rolAdmVerified } from "../../middlewares/session.js";
import { subirImagen } from "../../middlewares/storage.js";
import { Router } from "express";
export const publiRouter = Router();

//ruta para cargar los productos
publiRouter.post(
  "/upload",
  sessionVerified,
  subirImagen.single("imagen"),
  createPublic
);
//update publics
publiRouter.put("/update", sessionVerified, editPublics);
//get publics
publiRouter.get("/", sessionVerified, getAllpublics);
//delete publics
publiRouter.delete("/delete", sessionVerified, deletPublic);
