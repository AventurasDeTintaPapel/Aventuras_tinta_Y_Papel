import { PAYPAL_API, PAYPAL_API_KEY, PAYPAL_API_CLIENT } from "../config.js";
import axios from "axios";
import dotenv from "dotenv";
import pedidos from "../models/pedidos.model.js";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;

export const createOrder = async (req, res) => {
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

    const { idUsuario } = req.body;

    // Convertir idUsuario en ObjectId

    const result = await pedidos.findOne({
      usuario: new mongoose.Types.ObjectId(idUsuario),
    });

    if (result) {
      console.log(`Total final del pedido: ${result.totalFinal}`);
    } else {
      console.log("No se encontró un pedido para este usuario.");
    }
    const aumount = result.totalFinal;
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: aumount,
          },
        },
      ],
      application_context: {
        brand_name: "Nueva Tienda",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:${port}/capture-order`,
        cancel_url: `http://localhost:${port}/cancel-order`,
      },
    };

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

    console.log(response.data);
    // Devuelve el order ID y el enlace de aprobación
    res.json({
      msg: "orden creada correctamente",
      orderId: response.data.id,
      approvalUrl: response.data.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la orden");
  }
};
export const captOrder = async (req, res) => {
  const { token } = req.query;
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_KEY,
        },
      }
    );
    console.log(response.data);
    return res.send("pagado");
  } catch (error) {
    console.log("error", error);
    console.log("error", error.response ? error.response.data : error.message);
    res.status(500).send("Error al capturar la orden");
  }
};
