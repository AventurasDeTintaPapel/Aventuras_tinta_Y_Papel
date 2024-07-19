const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");
const usuario = require("../models/usuarios.model");
// Definimos un objeto vacio con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

ctrl.register = async(req,res)=>{
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
ctrl.login = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;

    try {
        if (!nombreUsuario || !contrasenia) {
            return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        }

        const usuarioEncontrado = await usuario.findOne({ nombreUsuario });

        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const validarContrasenia = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!validarContrasenia) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.status(200).json({ msg: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
}

ctrl.admin = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;

    try {
        if (!nombreUsuario || !contrasenia) {
            return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        }

        const usuarioEncontrado = await usuario.findOne({ nombreUsuario });

        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'La contraseña o el usuario son incorrectos' });
        }

        const validarContrasenia = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!validarContrasenia) {
            return res.status(400).json({ msg: 'La contraseña o el usuario son incorrectos' });
        }

        if (usuarioEncontrado.rol !== 'admin') {
            return res.status(403).json({ msg: 'Usted no es administrador' });
        }

        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.status(200).json({ msg: 'Bienvenido administrador', token });
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
}

module.exports = ctrl;
