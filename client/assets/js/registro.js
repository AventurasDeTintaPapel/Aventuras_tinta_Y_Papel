//Tomamos el form del html.
const form = document.getElementById('form');

// Funcion para registrarse
const register = async (e) => {

    // Evitamos el evento submit.
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('email').value;
    const fechaNacimiento=document.getElementById('fecha-nacimiento').value;
    const contraseña = document.getElementById('contraseña').value;

    // Realizamos la peticion a nuestro servidor.
    const peticion = await fetch('http://localhost:3400/register', {
        method: 'POST',
        body: JSON.stringify({nombre, apellido, usuario, correo,fechaNacimiento, contraseña}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        //Caso contrario, mostramos el mensaje.
        alert(respuesta.msg)

        // Redirigimos al usuario al login.
        window.location.href ='/client/registro/login.html'

    }
}

form.addEventListener('submit', register);

