import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  async function createOrder(data, actions) {
    const response = await fetch("http://localhost:3400/api/create-order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const order = await response.json();
    const orderID = order.orderId;
    console.log(order);

    return orderID;
  }

  const onApproveOrder = async (data, actions) => {
    const token = localStorage.getItem("token");
    try {
      const orderId = data.orderID;

      if (!orderId) {
        console.error("Error: No se obtuvo un orderId válido.");
        return;
      }

      // Capturar la orden en el backend
      const response = await fetch("http://localhost:3400/api/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        credentials: "include",
        body: JSON.stringify({ paypalToken: orderId }),
      });

      const result = await response.json();
      console.log("Orden capturada exitosamente:", result);
    } catch (error) {
      console.error("Error al capturar la orden:", error);
    }
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId: "Ab-GPkTvpSFTaIAjQ8jjFQ_0jqhONBwX8G0McqIQZIvyZvBwnmrvWbeUGKCu5mrQ0cFHN7qiDchPuxpz",
      }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApproveOrder} />
    </PayPalScriptProvider>
  );
}
