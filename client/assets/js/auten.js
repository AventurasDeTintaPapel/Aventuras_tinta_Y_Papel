// href="../registro/login.html"><i class="ususario fi-ss-admin"></i>

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        document.getElementById('seccion').innerHTML = `
           
            <a class="usuarios" href="/client/registro/login.html">Iniciar Sesión</a>
        `;
    } else {
        document.getElementById('seccion').innerHTML = `
            <a class="usuarios"  href="../inicio/inicio.html" id="cerrarSesion">Cerrar Sesión</a>
        `;
        document.getElementById('cerrarSesion').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
});

    