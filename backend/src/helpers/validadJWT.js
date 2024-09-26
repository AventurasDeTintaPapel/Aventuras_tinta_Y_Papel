<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.model.js';

export const validarJWT = async (token) => {
    try {
        const { id } = jwt.verify(token, 'mysecret');
        // Buscamos el usuario por id en MongoDB.
        const usuario = await Usuario.findById(id);
=======
import  verify from 'jsonwebtoken';

//funcion para validar jwt
export const validarJWT = async (token) => {
    try {
        const { id } = verify(token, 'mysecret');
        //funcion para buscar al usuario
        const usuario = await findById(id);
>>>>>>> 8a96fb2c563c2d46057a26efe2e0ba904f1ef6e4

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
