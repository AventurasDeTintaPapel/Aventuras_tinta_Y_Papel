import { Router } from "express";
import {
  actualizarUsuario,
  deleteUser,
  accountRecovery,
} from "../controllers/user.controllers.js";
import { validateJwt } from "../../middlewares/session.js";

export const userRoutes = Router();

userRoutes.post("/update", validateJwt, actualizarUsuario);
userRoutes.delete("/delete", validateJwt, deleteUser);
userRoutes.post("/reset", accountRecovery);
