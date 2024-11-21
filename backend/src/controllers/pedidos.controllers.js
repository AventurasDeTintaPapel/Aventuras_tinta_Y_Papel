import pedidos from "../models/pedidos.model.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";

// add item of the cart
export const addCart = async (req, res) => {
  try {
    const { idProducto, cantidad } = req.body;

    const idUsuario = req.user._id;
    const obtProducto = await producto.findById(idProducto);
    if (!obtProducto) {
      console.log("product not find");
      return res.status(404).json({ msg: "product not find" });
    }

    const cardFind = await pedidos.find({ usuario: idUsuario }); // Devuelve un array
    // Encuentra el pedido del usuario en estado "incompleto"
    const pedido = await pedidos.findOne({
      usuario: idUsuario,
      estado: "incompleto",
    });

    // Si no hay un pedido incompleto, crea uno nuevo
    if (!pedido) {
      const newPedido = new pedidos({
        productos: [{ producto: idProducto, cantidad }],
        usuario: idUsuario,
        estado: "incompleto",
      });

      await newPedido.save();
      return console.log("Nuevo pedido creado:", newPedido);
    }

    // Si ya existe un pedido incompleto, actualiza o añade el producto
    const productoExistente = pedido.productos.find((p) => p.producto.toString() === idProducto);

    if (productoExistente) {
      // Incrementa la cantidad del producto si ya está en el pedido
      productoExistente.cantidad += cantidad;
    } else {
      // Agrega un nuevo producto al pedido
      pedido.productos.push({ producto: idProducto, cantidad });
    }

    await pedido.save();
    console.log("Pedido actualizado:", pedido);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//update orders
export const uptdaOrder = async (req, res) => {
  try {
    const { id, state } = req.body;

    const resultado = await pedidos.findByIdAndUpdate(
      id,
      { estado: state },
      {
        new: true,
      }
    );
    if (!resultado) {
      return res.status(404).json({ msg: "order not find" });
    } else {
      return res.status(200).json({ msg: "updated order", resultado });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error " });
  }
};

//delete items of the cart
export const deletItem = async (req, res) => {
  try {
    const { idProducto } = req.body;
    const idUsuario = req.user._id;
    console.log("ID Producto recibido:", idProducto);

    // Asegurarse de que el ID es un ObjectId válido
    const objectIdProducto = new mongoose.Types.ObjectId(idProducto);

    // Buscar el pedido
    const cardFind = await pedidos.findOne({ usuario: idUsuario, estado: "incompleto" });
    console.log("Pedido encontrado:", cardFind);

    // Actualizar el pedido para eliminar el producto
    const result = await pedidos.updateOne(
      { usuario: idUsuario, "productos.producto": objectIdProducto },
      { $pull: { productos: { producto: objectIdProducto } } }
    );

    console.log("Resultado de updateOne:", result);

    if (result.modifiedCount > 0) {
      return res.status(200).json({ msg: "The product was eliminated" });
    } else {
      return res.status(404).json({ msg: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// delete order
export const deletOrder = async (req, res) => {
  try {
    const idUsuario = req.user._id;

    const ObjectId = new mongoose.Types.ObjectId();
    const result = await pedidos.findOneAndDelete({ usuario: idUsuario });

    if (!result) {
      return res.status(404).json({ msg: "order not find" });
    }

    return res.status(200).json({ msg: "Delete order" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Interval server error" });
  }
};

// get order for user id
export const getOrder = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const ObjectId = new mongoose.Types.ObjectId();
    // Buscar el pedido y poblar los productos
    const result = await pedidos.find({ usuario: new mongoose.Types.ObjectId(idUsuario) }).populate("productos.producto");

    if (!result) {
      return res.status(404).json({ msg: "order not find" });
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Interval error sever" });
  }
};

//update amount of the product in the cart
export const updaAmout = async (req, res) => {
  try {
    const { amount, idProduct } = req.body;
    const idUsuario = req.user._id;
    const ObjectId = new mongoose.Types.ObjectId();
    const cardFind = await pedidos.findOne({ usuario: idUsuario });
    console.log(cardFind);
    console.log(idProduct);
    const prodFind = cardFind.productos.find((p) => p.producto && p.producto.toString() === idProduct);

    if (!prodFind) {
      return res.status(404).json({ msg: "Producto no encontrado en el carrito." });
    } else {
      // Actualizar la cantidad del producto encontrado
      prodFind.cantidad = amount;

      await cardFind.save();
      return res.status(200).json({ msg: "Cantidad actualizada con éxito", cardFind });
    }
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ msg: "Internal server errir" });
  }
};

//get all oders
export const getAllOrders = async (req, res) => {
  try {
    const result = await pedidos.find().populate("productos.producto");
    if (result.length === 0) {
      res.status(404).json({ msg: "There are no orders" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log("server error", error);
    return res.status(500).json({ msg: "interval error server" });
  }
};
