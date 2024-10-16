import { Router } from "express";
export const supRouter = Router();
// import { rolAdmVerified } from "../../middlewares/session.js";
import { createSupplier } from "../controllers/proveedores.controllers.js";

//create a supplier
supRouter.post("/create/", createSupplier);
