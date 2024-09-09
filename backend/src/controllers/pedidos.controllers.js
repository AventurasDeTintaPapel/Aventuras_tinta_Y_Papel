import pedido from "../models/pedidos.model.js";
import mongoose from "mongoose";
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";

//agregar al pedido
export const agrePedido = async (req, res) => {
  try {
    const { idUsuario, totalFinal, productos } = req.body;

    // Extraer el primer producto del array
    const { idProducto, cantidad = 1 } = productos[0];

    // Verificar si el producto existe en la base de datos
    const obtProducto = await producto.findById(idProducto);
    if (!obtProducto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Buscar si el usuario ya tiene un pedido en la base de datos
    const cardFind = await pedido.findOne({ usuario: idUsuario });
    let numPedido = 0;

    if (!cardFind) {
      numPedido++;
      const newPedido = new pedido({
        productos: [
          {
            producto: idProducto,
            cantidad: cantidad,
          },
        ],
        totalFinal,
        usuario: idUsuario,
        numPedido,
      });

      await newPedido.save();
      return res.json(newPedido);
    } else {
      const prodFind = cardFind.productos.find(
        (p) => p.producto && p.producto.toString() === idProducto
      );

      if (prodFind) {
        console.log("Producto ya está en el pedido");
        prodFind.cantidad += cantidad;
      } else {
        cardFind.productos.push({
          producto: idProducto,
          cantidad: cantidad,
        });
      }

      await cardFind.save();
      return res.json(cardFind);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

//editar el producto del pedido
export const ediPedido = async (req, res) => {
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
    //verificar si el pedido existe
    let pedidoExistente = await pedido.findOne({ usuario: idUsuario });
    //verifica si el producto esta incluido en el pedido
    const prodFind = await pedidoExistente.productos.find(
      (p) => p.producto.toString() === id
    );
    if (!prodFind) {
      res.status(401).json({ msg: "el producto no existe en el pedido" });
    } else {
      prodFind.cantidad = cantidad;
      pedidoExistente.save();
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
    const result = await pedido.updateOne(
      { usuario: idUsuario },
      { $pull: { productos: { producto: new ObjectId(idProducto) } } }
    );
    if (result) {
      res.status(200).json({ msg: "el producto fue eliminado correctamente" });
    }
    const cardFind = await pedido.findOne({ usuario: idUsuario });
    //si el array esta vacio se elimina al usuario de colección
    if (cardFind.productos.length === 0) {
      const result = await pedido.findOneAndDelete({ usuario: idUsuario });
      if (result) {
        res.status(200).json({ msg: "el pedido fue eliminado de la bd" });
      }
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

//Eliminar el pedido
export const elimPedido = async (req, res) => {
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

    const result = await pedido.findOneAndDelete({ usuario: idUsuario });
    if (result) {
      res.status(200).json({ msg: "el pedido fue eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
  }
};

//obtener el pedido
export const obtPedido = async (req, res) => {
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
  const result = await pedido
    .findOne({ usuario: idUsuario })
    .populate("productos.producto");
  res.json(result);
};
