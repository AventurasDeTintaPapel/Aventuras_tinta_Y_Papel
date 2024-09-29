import pedidos from "../models/pedidos.model.js";
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

    const obtProducto = await producto.findById(idProducto);
    if (!obtProducto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const cardFind = await pedidos.findOne({ usuario: idUsuario });
    let numPedido = 0;

    if (!cardFind) {
      numPedido++;
      const newPedido = new pedidos({
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
    let pedidoExistente = await pedidoModel.findOne({ usuario: idUsuario });
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
    const ObjectId = mongoose.Types.ObjectId;
    const result = await pedidoModel.updateOne(
      { usuario: idUsuario },
      { $pull: { productos: { producto: new ObjectId(idProducto) } } }
    );
    if (result) {
      res.status(200).json({ msg: "el producto fue eliminado correctamente" });
    }
    const cardFind = await pedidoModel.findOne({ usuario: idUsuario });

    if (cardFind.productos.length === 0) {
      const result = await pedidoModel.findOneAndDelete({ usuario: idUsuario });
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

    const result = await pedidoModel.findOneAndDelete({ usuario: idUsuario });
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
  // const token = req.headers.token;
  // if (!token) {
  //   return res.status(401).json({
  //     msg: "Debe registrarse para realizar esa tarea",
  //   });
  // }

  // const usuario = await validarJWT(token);
  // const idUsuario = await usuario._id;

  const { idUsuario } = req.params;

  try {
    // Buscar el pedido y poblar los productos
    const result = await pedidos
      .findOne({ usuario: new mongoose.Types.ObjectId(idUsuario) })
      .populate("productos.producto");

    // Verificar si se encontró el pedido
    if (!result) {
      return res.status(404).json({ msg: "No se encontró el pedido" });
    }

    // Responder con el pedido
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
