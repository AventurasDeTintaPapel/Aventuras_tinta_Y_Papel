import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalPayment = ({ carrito }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: { ...options, currency: value },
    });
  };

  const onCreateOrder = (data, actions) => {
    const total = 8.99; // Valor fijo directamente
    console.log("Total en PayPal onCreateOrder:", total); // Verifica el total
    if (total <= 0) {
      console.log("El total no puede ser cero o negativo");
      return;
    }

    // Crear la orden de PayPal con el total calculado
    return actions.order
      .create({
        purchase_units: [{ amount: { value: total } }],
      })
      .then((orderId) => {
        // Asegúrate de retornar el orderId correcto
        console.log("Order created successfully:", orderId);
        return orderId; // Retorna el orderId para completar el flujo
      });
  };

  const onApproveOrder = async (data, actions) => {
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
      const response = await fetch("http://localhost:3400/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ result: carrito, total: 8.99 }), // Usando 8.99 directamente
      });

      // Manejar la respuesta del backend
      if (!response.ok) {
        console.log("Error al enviar productos al backend");
        return;
      }

      const data = await response.json();
      console.log("Orden creada en el backend:", data);
    } catch (error) {
      console.error("Error en el fetch al backend", error);
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
