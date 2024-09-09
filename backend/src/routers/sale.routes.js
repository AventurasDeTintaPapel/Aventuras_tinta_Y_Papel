import Router from "express";
export const sale = Router();
import { sales } from "../controllers/sales.controllers.js";

sale.get("/:idUsuario", sales);
