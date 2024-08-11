import { register, login } from '../controllers/auth.controllers.js';
import { Router } from 'express';
import {regisValidation,loginValidation} from '../validations/authValidations.js';
import{applyValidations} from '../validations/applyValidations.js';
export const authRouter = Router();


//ruta para registrarse
authRouter.post('/register',regisValidation,applyValidations, register);

// ruta para el login.
authRouter.post('/login',loginValidation,applyValidations, login);


