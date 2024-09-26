import { MercadoPagoConfig, Preference } from "mercadopago";
import pedido from "../models/pedidos.model.js";
import { validarJWT } from "../helpers/validadJWT.js";
import pedidosModel from "../models/pedidos.model.js";

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2799417368412558-091522-0969e896919c4cf203eeae4d308ea3c6-814858340",
});

//funcion de mensaje en el caso de que se procese la peticion
export const processing = (req, res) => {
  res.status(200).json({ msg: "Procesando la peticion..." });
};
//funcion de mensaje en el caso de que la peticion vaya bien
export const aproved = (req, res) => {
  res.status(200).json({ msg: "La peticion ha sido aprobada..." });
};
//funcion en caso de que haya un error
export const denied = (req, res) => {
  res.status(404).json({ msg: "error al procesar la peticion" });
};
//funcion para generar el pago
export const generarPago = async (req, res) => {
  // const { title, quantity, unit_price, totalPrice } = req.body;
  // const token = req.headers.token;
  // if (!token) {
  //   return res.status(401).json({
  //     msg: "Debe registrarse para realizar esa tarea",
  //   });
  // }

  // const usuario = await validarJWT(token);
  // const idUsuario = await usuario._id;

  // if (!idUsuario) {
  //   return res.status(401).json({
  //     msg: "Token inválido",
  //   });
  // }
  //   const { idUsuario } = req.params;
  //   const onePedido = await pedido.findOne({ usuario: idUsuario });
  //   console.log(onePedido);
  //  if(!onePedido){
  //    return res.status(404).json({ msg: "Pedido no encontrado" });
  //  }

  try {
    const result = await Preference.create({
      body: {
        items: [
          {
            title: String(title),
            quantity: Number(quantity),
            unit_price: Number(unit_price),
            total_amount: Number(totalPrice),
          },
        ],
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
      },
    });
    console.log("Factura obtenida correctamente", result);
    if (result) {
      res.status(200).json({ msg: "Factura obtenida", result });
      console.log("Factura obtenida correctamente", result);
    }
  } catch (error) {
    console.error("Error en la creación de la factura", error);

    res.status(500).json({
      msg: "error interno del servidor por favor intentelo mas tarde ",
    });
  }
};
