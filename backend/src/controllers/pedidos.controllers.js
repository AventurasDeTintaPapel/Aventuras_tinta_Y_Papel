import pedidos from "../models/pedidos.model.js";
import mongoose from "mongoose";
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";

// Agregar al pedido
export const agrePedido = async (req, res) => {
  try {
    const { totalFinal, productos } = req.body;
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const idUsuario = usuario._id;
    const ObjectId = new mongoose.Types.ObjectId();

    if (!idUsuario || !totalFinal || !productos || productos.length === 0) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    // Extraer el primer producto del array
    const { idProducto, cantidad = 1 } = productos[0];

    const obtProducto = await producto.findById(idProducto);
    if (!obtProducto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const cardFind = await pedidos.findOne({ usuario: idUsuario });
    let numPedido = cardFind ? cardFind.numPedido : 1;

    if (!cardFind || cardFind.estado == "incompleto") {
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
      const prodFind = cardFind.productos.find((p) => p.producto && p.producto.toString() === idProducto);

      if (prodFind) {
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

// Editar el producto del pedido
export const ediPedido = async (req, res) => {
  try {
    const { id, state } = req.body;
    const estado = state;
    const resultado = await pedidos.findByIdAndUpdate(
      id,
      { estado: state },
      {
        new: true,
      }
    );
    if (!resultado) {
      return res.status(404).json({ msg: "pedido no encontrado" });
    } else {
      return res.status(200).json({ msg: "pedido actualizado correctamente", resultado });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar un producto del array de productos
export const elimElem = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const idUsuario = usuario._id;
    const ObjectId = mongoose.Types.ObjectId;

    const result = await pedidos.updateOne({ usuario: idUsuario }, { $pull: { productos: { producto: new ObjectId(idProducto) } } });

    if (!result.modifiedCount) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const cardFind = await pedidos.findOne({ usuario: idUsuario });

    if (cardFind.productos.length === 0) {
      await pedidos.findOneAndDelete({ usuario: idUsuario });
      return res.status(200).json({ msg: "El pedido fue eliminado de la base de datos" });
    }

    return res.status(200).json({ msg: "El producto fue eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar el pedido completo
export const elimPedido = async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const idUsuario = usuario._id;
    const result = await pedidos.findOneAndDelete({ usuario: idUsuario });

    if (!result) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }

    return res.status(200).json({ msg: "El pedido fue eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener el pedido
export const obtPedido = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    // Buscar el pedido y poblar los productos
    const result = await pedidos.findOne({ usuario: new mongoose.Types.ObjectId(idUsuario) }).populate("productos.producto");

    if (!result) {
      return res.status(404).json({ msg: "No se encontró el pedido" });
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
