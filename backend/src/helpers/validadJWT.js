import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.model.js';

export const validarJWT = async (token) => {
    try {
        const { id } = jwt.verify(token, 'mysecret');
        // Buscamos el usuario por id en MongoDB.
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return false;
        } else {
            return usuario;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
