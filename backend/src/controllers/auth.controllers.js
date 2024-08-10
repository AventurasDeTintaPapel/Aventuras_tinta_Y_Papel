import { compare } from 'bcrypt';
import {generarJWT} from "../helpers/generarJWT.js";
import usuarioSchema from "../models/usuarios.model.js";


//controlador de registro
export const register = async(req,res)=>{
    const {nombreUsuario,apellido,fechaNacimiento,email,contrasenia,nombre}= req.body;
    try{  
        if(!nombreUsuario || !nombre || !apellido||!contrasenia||!email||!fechaNacimiento){
            return res.status(400).json({
                msg:'todos los campos son requeridos '
            })
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
        if (!nombreUsuario || !contrasenia) {
            return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        }

        const usuarioEncontrado = await findOne({ nombreUsuario });

        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const validarContrasenia = await compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!validarContrasenia) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.status(200).json({ msg: 'Inicio de sesión exitoso', token,role:usuarioEncontrado.rol });
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
}

