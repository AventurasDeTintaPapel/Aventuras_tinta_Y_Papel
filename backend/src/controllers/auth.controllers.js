import bcrypt from 'bcrypt';
import {generarJWT} from "../helpers/generarJWT.js";
import usuario from "../models/usuarios.model.js";
import{validationResult} from 'express-validator'


//controlador de registro
export const register = async(req,res)=>{

    const {nombreUsuario,apellido,fechaNacimiento,email,ingreContra,nombre}= req.body;
    
    try{  
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json(errores)
        }
        
        console.log(ingreContra)
            // Validar que la contraseña no esté vacía
            if (!ingreContra) {
                return res.status(400).json({ msg: 'La contraseña es requerida' });
            }
        
        // Encriptar la contraseña
        const contrasenia = bcrypt.hashSync(ingreContra, 10);


        const newUser = new usuario({nombreUsuario,apellido,fechaNacimiento,email,contrasenia,nombre});
        console.log(contrasenia)
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
        if(!errores.isEmpty()){
            return res.status(400).json(errores)
        }
        
        if (!nombreUsuario || !contrasenia) {
            return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        }

        const usuarioEncontrado = await usuario.findOne({ nombreUsuario });

        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const validarContrasenia = bcrypt.compareSync(contrasenia, usuarioEncontrado.contrasenia);
        console.log(contrasenia,usuarioEncontrado.contrasenia)
      
        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.status(200).json({ msg: 'Inicio de sesión exitoso',token });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
}

