<<<<<<< HEAD
const direccionRegistro = "../../html/registro/login.html"
const direccionCerrarSesion = "../../html/inicio/inicioCambiado.html"

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const token = localStorage.getItem('token');
        const seccion = document.getElementById('seccion');

        if (seccion) {
            if (!token) {
                seccion.innerHTML = `
                    <a href=${direccionRegistro}>
                        <p class="usuariosOn">Iniciar Sesión</p>
                    </a>
                `;
            } else {
                seccion.innerHTML = `
                    <a href=${direccionCerrarSesion}>
=======
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const token = localStorage.getItem("token");
    const seccion = document.getElementById("seccion");

    if (seccion) {
      if (!token) {
        seccion.innerHTML = `
    
<a href="/client/html/registro/login.html" class="usuariosOn">inicio Sesión</a>   
              `;
      } else {
        seccion.innerHTML = `
                    <a href="../inicio/inicio.html" id="cerrarSesion">
>>>>>>> b98108c9f2070f22a360cb6b4081b8df7e44f563
                        <p class="usuariosOff">Cerrar Sesión</p>
                    </a>
                `;

        document
          .getElementById("cerrarSesion")
          .addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            window.location.reload();
          });
      }
    } else {
      console.error('El elemento con id="seccion" no fue encontrado.');
    }
  }, 200); // 200 ms para dar tiempo extra al DOM
});
