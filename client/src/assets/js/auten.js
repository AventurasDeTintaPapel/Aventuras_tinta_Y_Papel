document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const token = localStorage.getItem('token');
        const seccion = document.getElementById('seccion');

        if (seccion) {
            if (!token) {
                seccion.innerHTML = `
                    <a href="/client/registro/login.html">
                        <p class="usuariosOn">Iniciar Sesión</p>
                    </a>
                `;
            } else {
                seccion.innerHTML = `
                    <a href="../inicio/inicio.html" id="cerrarSesion">
                        <p class="usuariosOff">Cerrar Sesión</p>
                    </a>
                `;

                document.getElementById('cerrarSesion').addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    window.location.reload();
                });
            }
        } else {
            console.error('El elemento con id="seccion" no fue encontrado.');
        }
    }, 200); // 200 ms para dar tiempo extra al DOM
});
