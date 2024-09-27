// Función para crear la orden
async function createOrder() {
  try {
    const response = await fetch("http://localhost:3400/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.orderId; // Devuelve el orderId
  } catch (error) {
    console.error("Error creando la orden:", error);
  }
}

// Función para capturar la orden
async function onApprove(data) {
  try {
    const response = await fetch(
      `http://localhost:3400/capture-order?token=${data.orderID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("Pago capturado:", result);
    // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
  } catch (error) {
    console.error("Error capturando la orden:", error);
  }
}

// Renderizar el botón de PayPal
paypal
  .Buttons({
    createOrder: createOrder,
    onApprove: onApprove,
    style: {
      layout: "horizontal", // Estilo del botón
    },
  })
  .render("#paypal-button-container");
