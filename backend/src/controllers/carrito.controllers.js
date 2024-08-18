import carrito from "../models/carrito.model.js";
import mongoose from "mongoose";
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import token from "../helpers/validadJWT.js";
export const agreCarrito = async (req, res) => {
  try {
    const { idProducto } = req.body;
    const obtProducto = await producto.findById(idProducto);
    //funcion para obtener el usuario con el token
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "Debe registrarse para realizar esa tarea",
      });
    }

    const usuario = await validarJWT(token);
    const idUsuario = await usuario._id;
    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    //funcion para ver si el usuario ya tiene un carrito en la bd
    const cardFind = await carrito.findOne({
      usuario: idUsuario,
    });
    if (!cardFind) {
      console.log("yes");
      const newCarrito = new carrito({
        productos: [
          {
            producto: obtProducto,
            cantidad: 2,
          },
        ],
        usuario: idUsuario,
      });
      await newCarrito.save();
      res.json(newCarrito);
    } else {
      //funcion para buscar si el producto esta dentro del carrito
      const prodFind = cardFind.productos.find(
        (p) => p.producto.toString() === idProducto
      );
      if (prodFind) {
        console.log("yes");
        prodFind.cantidad += producto[0].cantidad || 1;
      } else {
        prodFind.productos.push({
          producto: idProducto,
          cantidad: producto[0].cantidad || 1,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
//editar el producto del carrito
export const ediCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    //funcion para obtener el usuario con el token
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "Debe registrarse para realizar esa tarea",
      });
    }

    const usuario = await validarJWT(token);
    const idUsuario = await usuario._id;
    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    //verificar si el carrito existe
    let carritoExistente = await carrito.findOne({ usuario: idUsuario });
    //verifica si el producto esta incluido en el carrito
    const prodFind = await carritoExistente.productos.find(
      (p) => p.producto.toString() === id
    );
    if (!prodFind) {
      res.status(401).json({ msg: "el producto no existe en la carrito" });
    } else {
      prodFind.cantidad = cantidad;
      carritoExistente.save();
      res.status(200).json({ message: "Producto actualizado correctamente" });
    }
  } catch (error) {
    console.log(error);
  }
};
//Eliminar un producto del array de productos
export const elimElem = async (req, res) => {
  try {
    const { idProducto } = req.params;
    //funcion para obtener el usuario con el token
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "Debe registrarse para realizar esa tarea",
      });
    }

    const usuario = await validarJWT(token);
    const idUsuario = await usuario._id;

    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    //funcion para eliminar el producto 
    const ObjectId = mongoose.Types.ObjectId;
    const result = await carrito.updateOne(
      { usuario: idUsuario },
      { $pull: { productos: { producto: new ObjectId(idProducto) } } }
    );
    if (result.ok) {
      res.status(200).json({ msg: "el producto fue eliminado correctamente" });
    }
    const cardFind = await carrito.findOne({ usuario: idUsuario });
    //si el array esta vacio se elimina al usuario de colección
    if (cardFind.productos.length === 0) {
      const result = await carrito.findOneAndDelete({ usuario: idUsuario });
      if (result) {
        res.status(200).json({ msg: "el carrito fue eliminado de la bd" });
      }
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
//Eliminar el carrito
export const elimCard = async (req, res) => {
  try {
    //funcion para obtener el usuario con el token
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "Debe registrarse para realizar esa tarea",
      });
    }

    const usuario = await validarJWT(token);
    const idUsuario = await usuario._id;

    if (!idUsuario) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }

    const result = await carrito.findOneAndDelete({ usuario: idUsuario });
    if (result) {
      res.status(200).json({ msg: "el carrito fue eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
  }
};
//obtener el carrito
export const obtCarrito = async (req, res) => {
  //funcion para obtener el usuario con el token
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      msg: "Debe registrarse para realizar esa tarea",
    });
  }

  const usuario = await validarJWT(token);
  const idUsuario = await usuario._id;

  if (!idUsuario) {
    return res.status(401).json({
      msg: "Token inválido",
    });
  }
  const result = await carrito.findOne({usuario:idUsuario}).populate("productos.producto");
  res.json(result);
};
