//Tomamos el form del html.
const form = document.getElementById('form')

// Funcion para iniciar sesión.
const login = async (e) => {

    // Evitamos el evento submit.
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const nombreUsuario = document.getElementById('usuario').value;
    const contrasenia = document.getElementById('contraseña').value;
    
    // Realizamos la peticion a nuestro servidor.
    const peticion = await fetch('http://localhost:3400/admin', {
        method: 'POST',
        body: JSON.stringify({nombreUsuario, contrasenia}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log('Petición realizada:', peticion);
    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        // Caso contrario mostrar el mensaje.
        alert(respuesta.msg)

        // Seteamos el token en el localStorage.
        localStorage.setItem('token', respuesta.token);

        // Redirigimos al usuario a la landingPage.
        window.location.href = 'http://127.0.0.1:5501/client/inicio/inicio.html'
    }

}

// Añadimos el evento submit al formulario.
form.addEventListener('submit', login);
