import { Router } from "express";
export const supRouter = Router();
import { createSupplier } from "../controllers/proveedores.controllers.js";

supRouter.post("/", createSupplier);
