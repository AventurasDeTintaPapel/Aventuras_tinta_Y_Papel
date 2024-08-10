import { register, login } from '../controllers/auth.controllers.js';
import { Router } from 'express';


export const authRouter = Router();
//ruta para registrarse
authRouter.post('/register', register);
//ruta para logear administradores

// ruta para el login.
authRouter.post('/login', login);


