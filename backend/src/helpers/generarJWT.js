import  sign from 'jsonwebtoken';

export const generarJWT = (id)=>{
    return new Promise((resolve, reject) => {
        sign(id, 'mysecret',{
            // Se establece un tiempo de duración del token.
            expiresIn: 600*600
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}
