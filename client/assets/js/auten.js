// href="../registro/login.html"><i class="ususario fi-ss-admin"></i>

document.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');

    if(!token){
        document.getElementById('seccion').innerHTML=`
         <li><a href="../registro/login.html"class="usuarios" ><i class="ususario fi-ss-admin"></i>iniciar Sesión</a></li>       
        `
    }else{
        document.getElementById('seccion').innerHTML=`
        <li><a id="cerrarSesion">Cerrar Sesión</a></li>`
        document.getElementById('cerrarSecion').addEventListener('click',()=>{
            localStorage.removeItem('token');

            window.location.reload();
        })
    }
})