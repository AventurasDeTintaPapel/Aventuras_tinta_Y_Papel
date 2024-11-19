import { Router } from "express";
import {
  updatUser,
  deleteUser,
  accountRecovery,
} from "../controllers/user.controllers.js";
import { validateJwt } from "../../middlewares/session.js";

export const userRoutes = Router();

userRoutes.post("/update", validateJwt, updatUser);
userRoutes.delete("/delete", validateJwt, deleteUser);
userRoutes.post("/reset", accountRecovery);
