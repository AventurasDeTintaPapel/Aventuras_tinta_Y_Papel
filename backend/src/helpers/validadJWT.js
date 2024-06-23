const jwt = require('jsonwebtoken');
const { connectDB } = require('../database/db');

const validarJWT = async (token) => {

    try {
        const { id } = jwt.verify(token, 'mysecret');

        const connection = await connectDB();

        // Buscamos el usuario por id.
        const [usuario] = await connection.query('SELECT * FROM USUARIOS WHERE idUsuario=? LIMIT 1', id);

        // En caso de que no exista retornamos false.
        if(!usuario){
            return false;
        } else {
            //Caso contrario retornamos el usuario.
            return usuario[0];
        }
        
    } catch (error) {
        // Si ocurre un error lo mostramos por consola y retornamos false.
        console.log(error);
        return false;
    }

}

module.exports = validarJWT;