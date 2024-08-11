import { compare } from 'bcrypt';
import {generarJWT} from "../helpers/generarJWT.js";
import usuario from "../models/usuarios.model.js";
import{validationResult} from 'express-validator'


//controlador de registro
export const register = async(req,res)=>{

    const {nombreUsuario,apellido,fechaNacimiento,email,contrasenia,nombre}= req.body;
    
    try{  
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json(errores)
        }
        
        const enconEmail = usuario.find(email);
        const enconUsuario = usuario.find(nombreUsuario)
        if(enconEmail){
            res.status(400).json({msg:'el email ya se encuentra registrado anteriormente'})
        }
        if(enconUsuario){
            res.status(400).json({msg:'nombre de usuario no disponible'})
        }

        const newUser = new usuario({nombreUsuario,apellido,fechaNacimiento,email,contrasenia,nombre});

        await newUser.save();
        res.status(200).json({msg:'usuario registrado correctamente'})

    }catch(error){
       console.log('ah ocurrido un error ',error)
    }
   
}
//controlador de login
export const login = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;

    try {
        const errores = validationResult(req);
        if(!errores){
            return res.status(400).json(errores)
        }
        // if (!nombreUsuario || !contrasenia) {
        //     return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        // }

        const usuarioEncontrado = await findOne({ nombreUsuario });

        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const validarContrasenia = await compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!validarContrasenia) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.status(200).json({ msg: 'Inicio de sesión exitoso' });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
}

