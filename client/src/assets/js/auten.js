document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        document.getElementById('seccion').innerHTML = `
            <a href="/client/registro/login.html"><p class="usuariosOn">Iniciar Sesión</p></a>
        `;
    } else {
        document.getElementById('seccion').innerHTML = `
            <a href="../inicio/inicio.html" id="cerrarSesion"><p class="usuariosOff">Cerrar Sesión</p></a>
        `;
        document.getElementById('cerrarSesion').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
});

