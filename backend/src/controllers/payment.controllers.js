import { PAYPAL_API, PAYPAL_API_KEY, PAYPAL_API_CLIENT } from "../config.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

export const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "10.00",
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
