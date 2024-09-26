// app.js
document.addEventListener("DOMContentLoaded", async () => {
  const btnPagar = document.getElementById("btn-pagar");
  const detallePedido = document.getElementById("detalle-pedido");

  // Nombre de usuario falso para pruebas
  const nombreUsuario = "usuario_falso";

  // Obtener el pedido del backend usando el nombre de usuario falso
  const obtenerPedido = async () => {
    try {
      const response = await fetch(
        `http://localhost:3400/api/pedidos/66be0f8cf1aebf49cbe3df17`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el pedido");
      }

      const pedido = await response.json();
      mostrarDetallePedido(pedido);
      console.log(pedido);
      return pedido;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Mostrar el detalle del pedido en el HTML
  const mostrarDetallePedido = (pedido) => {
    let html = '<ul class="list-group">';

    pedido.productos.forEach((producto) => {
      html += `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  ${producto.producto.title}
                  <span class="badge bg-primary rounded-pill">${producto.cantidad}</span>
                  <span>$${producto.producto.precio}</span>
              </li>
          `;
    });

    html += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Total:</strong>
              <span><strong>$${pedido.totalFinal}</strong></span>
          </li>
      </ul>`;

    detallePedido.innerHTML = html;
  };

  // Lógica para generar el pago con Mercado Pago
  const generarPago = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/pago/66be0f8cf1aebf49cbe3df17`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al generar el pago");
      }

      const data = await response.json();
      window.location.href = data.initPoint; // Redirige al usuario al enlace de pago
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Obtener el pedido al cargar la página
  const pedido = await obtenerPedido();

  // Manejar el clic en el botón de pagar
  btnPagar.addEventListener("click", generarPago);
});
