import favorites from "../models/favorito.model.js";
import { validarJWT } from "../helpers/validadJWT.js";
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import mongoose from "mongoose";

// Agregar producto a favoritos
export const addToFav = async (req, res) => {
  try {
    const { idProducto } = req.body;
    const token = req.headers.token;

    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ msg: "You must register to be able to perform this task" });
    }

    const user = await validarJWT(token);
    // Verificar si el token es válido
    if (!user) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = user._id;
    console.log(idProducto);
    console.log(user);

    // Buscar el usuario
    const obtenerUsuario = await usuario.findById(idUsuario);
    if (!obtenerUsuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" }); // Manejo del caso donde no se encuentra el usuario
    }

    // Buscar el producto
    const product = await producto.findById(idProducto);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" }); // Manejo del caso donde no se encuentra el producto
    }

    // Crear y guardar el favorito
    const favorito = new favorites({
      usuario: obtenerUsuario._id,
      producto: product._id,
    });

    await favorito.save();
    return res.status(201).json({ msg: "Agregado a favoritos", favorito }); // Asegúrate de usar return aquí
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al agregar el producto a favoritos" });
  }
};

// Obtener favoritos por ID
export const getFavs = async (req, res) => {
  try {
    const token = req.headers.token;

    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    // Verificar si el token es válido
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;

    // Realizar la agregación para obtener favoritos
    const resultado = await favorites.aggregate([
      {
        $match: { usuario: new mongoose.Types.ObjectId(idUsuario) },
      },
      {
        $lookup: {
          from: "productos",
          localField: "producto",
          foreignField: "_id",
          as: "productoInfo",
        },
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "usuarioInfo",
        },
      },
      { $unwind: "$productoInfo" },
      { $unwind: "$usuarioInfo" },
    ]);

    return res.status(200).json(resultado); // Asegúrate de usar return aquí
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while getting the favorites", error });
  }
};

// Eliminar productos de favoritos
export const deleteFavs = async (req, res) => {
  try {
    const token = req.headers.token;
    const { idProd } = req.body;

    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    // Verificar si el token es válido
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;

    // Eliminar el favorito
    const result = await favorites.deleteOne({
      usuario: idUsuario,
      producto: idProd,
    });

    if (result.deletedCount > 0) {
      return res.status(200).json({ msg: "Product successfully removed from favorites" });
    } else {
      return res.status(400).json({ msg: "Product not found in favorites" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
