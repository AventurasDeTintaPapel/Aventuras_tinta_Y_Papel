import Producto from "../models/productos.model.js";
import Usuario from "../models/usuarios.model.js";
import mongoose from "mongoose"; // Para usar ObjectId

const { ObjectId } = mongoose;

export const creatcoment = async (req, res) => {
  try {
    const { idUsuario, idProducto, body } = req.body;

    // Encuentra el usuario y el producto
    const usuarioEncontrado = await Usuario.findById(idUsuario);
    const productoEncontrado = await Producto.findById(idProducto);

    if (!productoEncontrado) {
      return res.status(404).json({ msg: "Usuario o producto no encontrado" });
    }
    if (!usuarioEncontrado) {
      return res.status(404).json({ msg: "Usuario  no encontrado" });
    }

    // Agregar comentario al array de comentarios del producto
    productoEncontrado.comentarios.push({
      usuario: usuarioEncontrado._id, // Almacenar solo el ID del usuario
      body: body,
    });

    // Guardar el producto actualizado
    await productoEncontrado.save();

    res.status(200).json({ msg: "Comentario añadido con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

export const delComent = async (req, res) => {
  try {
    const { idUsuario, idProducto } = req.body;

    // Encuentra el producto
    const productoEncontrado = await Producto.findById(idProducto);

    if (!productoEncontrado) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Encuentra el comentario dentro del array de comentarios
    const comentFind = productoEncontrado.comentarios.find(
      (comentario) =>
        comentario.usuario && comentario.usuario.toString() === idUsuario
    );

    if (!comentFind) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }

    // Elimina el comentario del array utilizando su _id
    await Producto.updateOne(
      { _id: idProducto },
      { $pull: { comentarios: { _id: comentFind._id } } }
    );

    res.status(200).json({ msg: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};
