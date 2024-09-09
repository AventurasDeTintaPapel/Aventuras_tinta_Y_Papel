import { client } from "../configure.js";
import { Payment } from "mercadopago";
import pedido from "../models/pedidos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";

// Inicialización de la API
const payment = new Payment(client);

// Obtener los datos del pedido
export const sales = async (req, res) => {
  try {
    // Descomenta y ajusta la validación del token si es necesaria
    // const token = req.headers.token;
    // if (!token) {
    //   return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    // }
    // const usuario = await validarJWT(token);
    // const idUsuario = await usuario._id;
    // if (!idUsuario) {
    //   return res.status(401).json({ msg: "Token inválido" });
    // }

    const { idUsuario } = req.params;
    const { methodId } = req.body;

    const result = await pedido
      .findOne({ usuario: idUsuario })
      .populate("productos.producto");

    res.json(result);

    // Procesar cada producto del pedido
    for (const item of result.productos) {
      const titulo = item.producto.titulo;
      const cantidad = item.cantidad;
      const precio = item.producto.precio;
      const total = precio * cantidad;

      const body = {
        transaction_amount: total,
        description: titulo,
        quantity: cantidad,
        payment_method_id: methodId,
      };

      // Crea la preferencia de pago con Mercado Pago
      try {
        const response = await payment.create(body);
        console.log(response);
      } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
      }
    }
  } catch (error) {
    console.error("Error en la obtención del pedido:", error);
    res.status(500).json({ msg: "Error al procesar la solicitud" });
  }
};
