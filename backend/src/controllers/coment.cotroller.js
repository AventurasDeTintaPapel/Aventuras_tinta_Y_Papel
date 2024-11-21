import Producto from "../models/productos.model.js";
import mongoose from "mongoose"; // Para usar ObjectId
import usuario from "../models/usuarios.model.js";
const { ObjectId } = mongoose;

//create coments
export const creatcoment = async (req, res) => {
  try {
    const { idProducto, body } = req.body;
    console.log(idProducto)
    const idUsuario = req.user._id;
    // Encuentra el usuario y el producto
    const prodFind = await Producto.findById(idProducto);

    if (!prodFind) {
      return res.status(404).json({ msg: "Usuario o producto no encontrado" });
    }
    // if (!usuarioEncontrado) {
    //   return res.status(404).json({ msg: "Usuario  no encontrado" });
    // }

    // Agregar comentario al array de comentarios del producto
    prodFind.comentarios.push({
      usuario: idUsuario,
      body: body,
    });

    // Guardar el producto actualizado
    await prodFind.save();

    res.status(200).json({ msg: "Comentario añadido con éxito" });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};
export const getComent = async (req, res) => {
  try {
    const userId = req.user._id;
    const {idProducto} = req.body;
    console.log(userId);
    console.log(idProducto);
    const result = await Producto.findById(idProducto).populate("comentarios.usuario");

    if (!result) {
      return res.status(404).json({ msg: "coment not find" });
    }

    res.status(200).json({result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error ", error });
  }
};

//delete coment
export const delComent = async (req, res) => {
  try {
    const { idComentario, idProducto } = req.body;
    const idUsuario = req.user._id;

    // Validar los IDs
    if (!mongoose.Types.ObjectId.isValid(idComentario) || !mongoose.Types.ObjectId.isValid(idProducto)) {
      return res.status(400).json({ msg: "IDs inválidos" });
    }

    // Buscar el producto
    const prodFind = await Producto.findById(idProducto);

    if (!prodFind) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Verificar si el comentario existe en el array
    const comentarioIndex = prodFind.comentarios.findIndex(
      (comentario) => comentario._id.toString() === idComentario
    );

    if (comentarioIndex === -1) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }

    // Verificar si el usuario es el autor del comentario
    const comentario = prodFind.comentarios[comentarioIndex];
    if (comentario.usuario.toString() !== idUsuario.toString()) {
      return res.status(403).json({ msg: "No tienes permiso para eliminar este comentario" });
    }

    // Eliminar el comentario utilizando $pull
    await Producto.updateOne(
      { _id: idProducto },
      { $pull: { comentarios: { _id: idComentario } } }
    );

    return res.status(200).json({ msg: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

//update coment
export const updaComent = async (req, res) => {
  try {
    const { idProducto, newBody } = req.body;
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;
    const ObjectId = new mongoose.Types.ObjectId();

    // find the product
    const prodFind = await Producto.findById(idProducto);

    if (!prodFind) {
      return res.status(404).json({ msg: "Product not find" });
    }

    const userFind = await usuario.findById(idUsuario);
    if (userFind) {
      res.status(404).json({ msg: "user not find" });
    }

    const comentFind = prodFind.comentarios.find(
      (comentario) =>
        comentario.usuario && comentario.usuario.toString() === idUsuario
    );
    if (!comentFind) {
      res.status(404).json({ msg: "Coment not find" });
    }

    prodFind.comentarios.push({
      usuario: userFind._id,
      body: body,
    });

    const result = await prodFind.save();
    !result
      ? res.status(301).json({ msg: "error updating comment" })
      : res.status(200).json({ msg: "updated comment" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "interval server error", error });
  }
};
