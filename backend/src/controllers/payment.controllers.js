import { PAYPAL_API, PAYPAL_API_KEY, PAYPAL_API_CLIENT } from "../config.js";
import axios from "axios";
import dotenv from "dotenv";
import pedidos from "../models/pedidos.model.js";
import productos from "../models/productos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;

export const createOrder = async (req, res) => {
  try {
    const idUsuario = req.user._id; // Obtener el id del usuario autenticado
    let precioFinal = 0;

    // Buscar el pedido incompleto del usuario
    const pedido = await pedidos.findOne({
      usuario: new mongoose.Types.ObjectId(idUsuario),
      estado: "incompleto",
    });

    if (!pedido) {
      return res
        .status(404)
        .json({ msg: "No se encontró un pedido para este usuario." });
    }

    // Buscar pedidos anteriores completados o entregados para aplicar descuento adicional si es necesario
    const oldsOrder = await pedidos.find({
      usuario: new mongoose.Types.ObjectId(idUsuario),
      $or: [{ estado: "completado" }, { estado: "entregado" }],
    });

    // Iterar sobre los productos del pedido y calcular el precio final
    for (const items of pedido.productos) {
      const productoId = items.producto;
      const cantidad = items.cantidad;

      // Buscar el producto por su ID
      const producto = await productos.findById(productoId);
      if (!producto) {
        throw new Error(`Producto con ID ${productoId} no encontrado`);
      }

      // Calcular el precio final
      precioFinal += cantidad * producto.precio;

      // Verificar stock disponible
      if (producto.stock < cantidad) {
        throw new Error(
          `Stock insuficiente para el producto: ${producto.nombre}`
        );
      }
    }
    if (precioFinal > 100.0 || oldsOrder.length > 10) {
      precioFinal += precioFinal * 0.15;
    }

    // Crear la orden de PayPal
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: precioFinal.toFixed(2), // Asegurarse que el precio final tiene 2 decimales
          },
        },
      ],
      application_context: {
        brand_name: "Nueva Tienda",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:${port}/api/capture-order`,
        cancel_url: `http://localhost:${port}/api/cancel-order`,
      },
    };

    // Obtener el access token de PayPal
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const { data } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_KEY,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const accessToken = data.access_token;

    // Crear la orden de PayPal
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      msg: "Orden creada correctamente",
      orderId: response.data.id,
      approvalUrl: response.data.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la orden");
  }
};
//funcion para capturar las ordenes
export const captOrder = async (req, res) => {
  const { paypalToken } = req.body;
  try {
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
    // Capturar el pago con PayPal
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${paypalToken}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_KEY,
        },
      }
    );
    console.log(response.data);
    const pedido = await pedidos.findOne({
      usuario: new mongoose.Types.ObjectId(idUsuario),
    });

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    // Recorrer los productos del pedido
    for (const items of pedido.productos) {
      const productoId = items.producto;
      const cantidad = items.cantidad;

      if (!cantidad || cantidad <= 0) {
        throw new Error(`Cantidad no válida para el producto: ${productoId}`);
      }

      const producto = await productos.findById(productoId);
      if (!producto) {
        throw new Error(`Producto con ID ${productoId} no encontrado`);
      }
      // Verificar si el producto tiene stock
      if (typeof producto.stock === "undefined") {
        throw new Error(
          `El producto con ID ${productoId} no tiene campo de stock`
        );
      }
      console.log("prod stock", producto.stock);
      const newStock = producto.stock - cantidad;
      console.log("new stock", newStock);
      console.log(cantidad);
      await producto.updateOne({ $set: { stock: newStock } });
    }

    // Actualizar el estado del pedido a "pendiente"
    pedido.estado = "completado";
    pedido.save();

    return res.status(200).json({ msg: "Pedido pagado correctamente" });
  } catch (error) {
    console.error("Error al procesar el pedido:", error.message);

    // Manejar error de PayPal si existe
    if (error.response) {
      console.log("Error de PayPal:", error.response.data);
    } else {
      console.log("Error general:", error.message);
    }

    res.status(500).send("Error al capturar la orden");
  }
};
