const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

 
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:3400/cargar', {
            method: 'POST',
            body: formData,
        });

        const respuesta = await response.json();

        if (response.ok) {
            form.reset();
            alert('Producto guardado correctamente');
            window.location.href = '127.0.0.1:5500/client/gestion/gestionProductos.html';
        } else {
            alert(respuesta.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al intentar guardar el producto.');
    }
});
