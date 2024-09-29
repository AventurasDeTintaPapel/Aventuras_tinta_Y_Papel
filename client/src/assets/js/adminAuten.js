document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    document.getElementById("seccion").innerHTML = `
            <a class="usuarios" href="/client/html/registro/login.html">Iniciar Sesión</a>
        `;
  } else {
    document.getElementById("seccion").innerHTML = `
            <a class="usuarios"  href="/client/html/inicio/inicio.html" id="cerrarSesion">Cerrar Sesión</a>
        `;
    document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }
});
