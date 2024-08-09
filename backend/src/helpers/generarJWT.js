const jwt = require('jsonwebtoken');

const generarJWT = (id)=>{
    return new Promise((resolve, reject) => {
        jwt.sign(id, 'mysecret',{
            // Se establece un tiempo de duración del token.
            expiresIn: 600*600
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}

module.exports = generarJWT;
