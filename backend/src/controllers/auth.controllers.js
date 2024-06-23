const { connectDB } = require("../database/db");
const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");

// Definimos un objeto vacio con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

//Empezamos a ir agrengando los controladores a dicho objeto.
ctrl.register = async (req, res) => {
    // Desestructuramos los datos que vienen del cuerpo de la petición.
    const { nombre, apellido, usuario, correo,fechaNacimiento, contraseña } = req.body;

    // Verificamos que todos los campos necesarios estén presentes
    if (!nombre || !apellido || !usuario || !correo || !fechaNacimiento ||!contraseña) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos'
        });
    }

    try {
        // Hacemos la conexión a la base de datos.
        const connection = await connectDB();
                // Generar un salt
                const salt = await bcrypt.genSalt(10);
                // Usar el salt para hashear la contraseña
                const hashContraseña2 = await bcrypt.hash(contraseña, salt);
        // Creamos la consulta.
        const sql = 'INSERT INTO USUARIOS (nombre, apellido, usuario, correo,fechaNacimiento, contraseña) VALUES (?,?,?,?,?,?)';

        // Ejecutamos la consulta.
        await connection.query(sql, [nombre, apellido, usuario, correo,fechaNacimiento,hashContraseña2]);
        // Respondemos a nuestro cliente
        res.json({
            msg: 'Registrado correctamente'
        });
        console.log(usuario,contraseña,hashContraseña2);

    } catch (error) {
        // Manejo de errores generales
        console.error(error);
        return res.status(500).json({
            msg: 'Error del servidor, por favor intente más tarde'
        });
    }
};


ctrl.login = async (req, res) => {
    const { usuario, contraseña } = req.body;
    console.log('Usuario:', usuario);

    try {
        const connection = await connectDB();
        const sql = 'SELECT * FROM usuarios WHERE usuario =? LIMIT 1';
        const [buscarUsuario] = await connection.query(sql,usuario);

        if (!buscarUsuario.length) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        const usuarioEncontrado = buscarUsuario[0];
        console.log(contraseña,buscarUsuario[0].contraseña)
        // Verifica que la contraseña y la contraseña almacenada no estén vacías o indefinidas
        if (!contraseña || !usuarioEncontrado.contraseña) {
            return res.status(400).json({ msg: 'Datos insuficientes para la autenticación' });
        }
        const validarContrasenia = bcrypt.compareSync(contraseña,buscarUsuario[0].contraseña);
        if(!usuarioEncontrado){
            return res.status(401).json({msg:"el usuario es incorrecto"})
        }
        if (!validarContrasenia) {
            return res.status(401).json({ msg: ' contraseña no coinciden' });
        }
        const token = await generarJWT({ id: usuarioEncontrado.id });
        return res.json({ msg: 'Inicio de sesión exitoso', token });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ msg: 'Error del servidor, por favor intente más tarde' });
    }
};

module.exports = ctrl;
