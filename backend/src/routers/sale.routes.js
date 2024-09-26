import Router from "express";
export const sale = Router();
import { generarPago } from "../controllers/sales.controllers.js";

sale.post("/:idUsuario", generarPago);
