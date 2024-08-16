import carrito from '../models/carrito.model.js';
import mongoose from 'mongoose';
import Usuario from '../models/usuarios.model.js';
import producto from '../models/productos.model.js';
import {validarJWT} from "../helpers/validadJWT.js";



// Agregar un producto al carrito
export const agreCarrito = async (req, res) => {
  try {
    const { cantidad, idProducto } = req.body;
    const { idUsuario } = req.body;
    // const token = req.headers.token;
    // if (!token) {
    //   return res.status(401).json({
    //     msg: "Debe registrarse para realizar esa tarea",
    //   });
    // }

    // const idUsuario = await validarJWT(token);
    // if (!idUsuario) {
    //   return res.status(401).json({
    //     msg: "Token inválido",
    //   });
    // }
    console.log(idUsuario);
    const obtenerUsuario = await Usuario.findById(idUsuario);

    if (!obtenerUsuario) {
      return res.status(401).json({ msg: "usuario no encontrado" });
    }
    const obtenerProducto = await producto.findById(idProducto);

    const newCarrito = new carrito({
      usuario: obtenerUsuario._id,
      producto: obtenerProducto._id,
      cantidad,
    });
    await newCarrito.save();
    res.json({ msg: "El carrito fue cargado correctamente", newCarrito });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al agregar el producto al carrito" });
  }
};
//editar el carrito (elementos separados)
export const editarCarrito = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const { id } = req.params;
    const carritoEncontrado = await carrito.findById(id);

    if (!carritoEncontrado) {
      console.log("el carrito no se encuentra disponible ");
    }
    const carritoEdit = {
      cantidad,
    };
    console.log(carritoEncontrado);
    const result = await carrito.findByIdAndUpdate(
      carritoEncontrado,
      carritoEdit,
      { new: true }
    );
    if (result) {
      res.status(200).json({ msg: "el carrito fue actualizado correctamente" });
    } else {
      res.status(404).json({ msg: "error al actualizar el carrito" });
    }
  } catch (error) {
    console.log("ocurrio un error al editar el carrito", error);
  }
};
//eliminar elementos de la Base de datos
export const eliminarCarrito = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "Debe registrarse para realizar esa tarea",
      });
    }
    const idUsuario = await validarJWT(token);
    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    console.log(idUsuario);

    const ObjectId = mongoose.Types.ObjectId;

    const obtenerUsuario = await carrito.aggregate([
      {
        $match: { usuario: new ObjectId(idUsuario) },
      },
    ]);
    console.log(obtenerUsuario);
    const resultado = await carrito.deleteMany({
      usuario: new ObjectId(idUsuario),
    });

    if (resultado) {
      res
        .status(200)
        .json({ msg: "producto eliminado correctamente del carrito" });
    } else {
      res
        .status(400)
        .json({ msg: "no hay ningun producto añadido al carrito" });
    }
  } catch (error) {
    console.log(error);
  }
};
//eliminar elementos de la Base de datos
export const eliminarElemento = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await carrito.findOneAndDelete(id);

    if (resultado) {
      res
        .status(200)
        .json({ msg: "producto eliminado correctamente del carrito" });
    } else {
      res
        .status(400)
        .json({ msg: "no hay ningun producto añadido al carrito" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Obtener todos los carritos
export const obteCarrito = async (req, res) => {
  const token = req.headers.token;
  try {
    const ObjectId = mongoose.Types.ObjectId;
    if (!token) {
      return res.status(401).json({
        msg: "el carrito esta vacio",
      });
    }
    const idUsuario = await validarJWT(token);
    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    console.log(idUsuario)

    const result = await carrito.aggregate([
      {
        $match: { usuario: new ObjectId(idUsuario) },
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

    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los carritos" });
    }
  }
};

