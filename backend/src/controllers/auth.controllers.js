import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";
import usuario from "../models/usuarios.model.js";
import { validationResult } from "express-validator";

// register
export const register = async (req, res) => {
  const {
    nombreUsuario,
    apellido,
    fechaNacimiento,
    email,
    ingreContra,
    nombre,
  } = req.body;

  try {
    //validations
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json(errores);
    }

    const contrasenia = bcrypt.hashSync(ingreContra, 10);

    const newUser = new usuario({
      nombreUsuario,
      apellido,
      fechaNacimiento,
      email,
      contrasenia,
      nombre,
    });

    await newUser.save();
    res.status(200).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    console.log("ah ocurrido un error ", error);
  }
};
//controlador de login
export const login = async (req, res) => {
  const { nameUser, password } = req.body;

  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json(errores);
    }

    if (!nameUser || !password) {
      return res
        .status(400)
        .json({ msg: "Datos insuficientes para la autenticación" });
    }

    const usuarioEncontrado = await usuario.findOne({
      nombreUSuario: nameUser,
    });

    if (!usuarioEncontrado) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    const validarContrasenia = bcrypt.compareSync(
      password,
      usuarioEncontrado.contrasenia
    );

    const token = await generarJWT({ id: usuarioEncontrado.id });
    return res.status(200).json({ msg: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error del servidor, por favor intente más tarde" });
  }
};
