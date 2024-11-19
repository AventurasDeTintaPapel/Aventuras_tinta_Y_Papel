import { validationResult } from 'express-validator'; 
import bcrypt from 'bcryptjs';
import usuario from '../models/usuarios.model.js'; // Asegúrate de que la ruta sea la correcta
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';  // Importar mongoose para manejar ObjectId si es necesario

const JWT_SECRET = "mysecret";

// Función para verificar el JWT y decodificar la información
const verificarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.authToken;
  console.log("token:", token);
  
  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardar el usuario decodificado en el objeto de la solicitud
    next(); // Continuar con el siguiente middleware
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid." });
  }
};

// Función para generar un nuevo JWT
const generarJWT = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Controlador para actualizar la información del usuario logueado
export const actualizarUsuario = async (req, res) => {
  const { userId } = req.user; // Obtener el userId directamente desde el objeto req.user, que ya fue decodificado por el middleware

  // Validar los datos de entrada
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }

  const { nombre, email, contrasenia } = req.body;

  try {
    // Verificar que el userId sea un ObjectId de MongoDB válido
    const userObjectId = new mongoose.Types.ObjectId(userId); // Crear el ObjectId correctamente

    // Buscar al usuario por ID
    const userFind = await usuario.findById(userObjectId); // Asegúrate de que el userId esté convertido a ObjectId
    console.log("usuario encontrado:", userFind);

    if (!userFind) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verificar si se debe actualizar la contraseña
    let updatedPassword = userFind.contrasenia;

    if (contrasenia) {
      updatedPassword = bcrypt.hashSync(contrasenia, 10); // Hash de la nueva contraseña
    }

    // Actualizar la información del usuario
    const updatedUser = await usuario.findByIdAndUpdate(
      userObjectId, // Usar el ObjectId convertido
      {
        $set: {
          nombre: nombre || userFind.nombre,
          email: email || userFind.email,
          contrasenia: updatedPassword,
        },
      },
      { new: true }
    );

    // Generar un nuevo token después de la actualización (si es necesario)
    const tokenNuevo = generarJWT(updatedUser._id); // Usar la función generada previamente

    // Enviar la respuesta con el token actualizado y la información del usuario
    return res.status(200).json({
      msg: "User updated successfully",
      token: tokenNuevo,
      usuario: {
        id: updatedUser._id,
        email: updatedUser.email,
        rol: updatedUser.rol,
        nombre: updatedUser.nombre,
      },
    });
  } catch (error) {
    console.log("Error updating user", error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};





//delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const userUpdate = { username, password, email };

    const result = usuario.findByIdAndUpdate(idUser, userUpdate, { new: true });
    !result
      ? res.status(404).json({ msg: "error deleting user" })
      : res.status(201).json({ msg: "user delete" });
  } catch (error) {
    console.log("Internal Server Error ", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//account Recovery
export const accountRecovery = async (req, res) => {
  const { email } = req.body;
  try {
    // Buscar el usuario por correo electrónico
    const userFind = await usuario.findOne({ email: email });

    if (!userFind) {
      return res.status(404).json({ msg: "User not found" });
    }

    const idUser = userFind._id;
    const newPassword = generarContrasena(); // Generar nueva contraseña
    console.log(newPassword);

    // Hash de la nueva contraseña
    const contrasenia = bcrypt.hashSync(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    const result = await usuario.findByIdAndUpdate(
      idUser,
      { contrasenia: contrasenia }, // Asegúrate de que el campo sea 'password'
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Error al actualizar la contraseña" });
    }

    // Enviar la nueva contraseña por correo electrónico
    await passwordEmail(newPassword, email);

    res
      .status(200)
      .json({ msg: "La nueva contraseña ha sido enviada", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};
//get user
export const getUser = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "You must register to perform this task" });
    }
    const usuario = await validarJWT(token);

    !usuario
      ? res.status(401).json({ msg: "invalid token" })
      : (idUser = usuario._id);

    const result = usuario.findById(idUser);

    res.status(201).json({ msg: "user", result });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ msg: "internal server error", error });
  }
};
