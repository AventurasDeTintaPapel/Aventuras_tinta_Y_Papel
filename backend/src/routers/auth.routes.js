import {
  register,
  login,
  logout,
  getMeCtrl,
} from "../controllers/auth.controllers.js";

import { validateJwt } from "../../middlewares/session.js";
import { Router } from "express";
import {
  regisValidation,
  loginValidation,
} from "../validations/authValidations.js";
import { applyValidations } from "../validations/applyValidations.js";

export const authRouter = Router();

//router register
authRouter.post("/register", regisValidation, applyValidations, register);

// router login user
authRouter.post("/login", login);
//router logout
<<<<<<< HEAD
authRouter.post("/logout", logout);
//router get user
authRouter.get("/user", validateJwt, getMeCtrl);
=======
authRouter.post("/logout", sessionVerified, logout);

authRouter.get("/me", sessionVerified, (req, res) => {
  res.json(req.usuario);
});
>>>>>>> b7a44cab564b86eec19a53984b05bf899d5ac6fe
