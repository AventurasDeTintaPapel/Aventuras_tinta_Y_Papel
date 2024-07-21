const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.model')

const validarJWT = async (token) => {
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

    
module.exports = validarJWT;