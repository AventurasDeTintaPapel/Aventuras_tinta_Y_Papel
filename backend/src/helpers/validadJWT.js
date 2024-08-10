import  verify from 'jsonwebtoken';


export const validarJWT = async (token) => {
    try {
        const { id } = verify(token, 'mysecret');

        // Buscamos el usuario por id en MongoDB.
        const usuario = await findById(id);

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

    
