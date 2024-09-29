import { Router } from "express";

import { autFilter } from "../controllers/filtros.controlers.js";

export const filRoutes = Router();

filRoutes.get("/", autFilter);
