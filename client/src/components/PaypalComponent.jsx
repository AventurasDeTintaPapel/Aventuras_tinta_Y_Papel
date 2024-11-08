import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalPayment = ({ carrito }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const total = 900;

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: { ...options, currency: value },
    });
  };

  const onCreateOrder = async (data, actions) => {
    try {
      console.log("Total en PayPal onCreateOrder:", total); // Verifica el total
      if (total <= 0) {
        console.log("El total no puede ser cero o negativo");
        return;
      }

      // Crear la orden de PayPal con el total calculado
      const ordenCarrito = await actions.order.create({
        purchase_units: [{ amount: { value: total } }],
      });

      console.log("Order created successfully:", ordenCarrito);

      return ordenCarrito;
    } catch (error) {
      console.log({ error });
    }
  };

  const onApproveOrder = async (data, actions) => {
    console.log({ data });

    try {
      // Capturar la orden
      const details = await actions.order.capture();
      const name = details.payer.name.given_name;
      alert(`Transacción completada por ${name}`);

      // Enviar información al backend
      await enviarCarrito();
    } catch (error) {
      console.error("Error al aprobar la orden", error);
    }
  };

  // Función para enviar el carrito al backend
  const enviarCarrito = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("error al obtener token");
        return;
      }

      // Enviar el carrito y el total al backend
      const response = await fetch("http://localhost:3400/api/create-orderPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ result: carrito, total }),
      });

      // Manejar la respuesta del backend
      if (!response.ok) {
        console.log("Error al enviar productos al backend", { result: carrito, total });
        return;
      }

      const data = await response.json();
      console.log("Orden creada en el backend:", data);
    } catch (error) {
      console.error("enviarCarrito:", error);
    }
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">💵 USD</option>
            <option value="EUR">💶 Euro</option>
          </select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default PayPalPayment;
