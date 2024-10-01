<<<<<<< HEAD
<<<<<<< HEAD
=======
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.model.js';
>>>>>>> b98108c9f2070f22a360cb6b4081b8df7e44f563
import  verify from 'jsonwebtoken';

//funcion para validar jwt
export const validarJWT = async (token) => {
    try {
        const { id } = verify(token, 'mysecret');
        //funcion para buscar al usuario
        const usuario = await findById(id);
<<<<<<< HEAD
=======
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.model.js';

export const validarJWT = async (token) => {
    try {
        const { id } = jwt.verify(token, 'mysecret');
        // Buscamos el usuario por id en MongoDB.
        const usuario = await Usuario.findById(id);
>>>>>>> origin/JaquelineAtienza
=======

>>>>>>> b98108c9f2070f22a360cb6b4081b8df7e44f563

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
