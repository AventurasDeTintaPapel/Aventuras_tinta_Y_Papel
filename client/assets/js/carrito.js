const contenedor = document.getElementById('contenedor');

// Función para descontar la cantidad del producto
const decreme = async (event) => {
    const button = event.target;
    const idProducto = button.dataset.id;
    const cantidadElemento = button.nextElementSibling; // Selecciona el elemento de cantidad en relación con el botón
    let cantidad = parseInt(cantidadElemento.textContent);

    if (cantidad > 1) {
        cantidad--;
    }

    try {
        const actualizarCantidad = await fetch(`http://localhost:3400/carrito/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify({ cantidad }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (actualizarCantidad.ok) {
            console.log('Carrito actualizado correctamente');
            actualizarCantidadElemento(idProducto, cantidad);
        } else {
            console.log('Error al actualizar el carrito');
        }
    } catch (error) {
        console.log('Hubo un error', error);
    }
};

// Función para aumentar la cantidad
const agreg = async (event) => {
    const button = event.target;
    const idProducto = button.dataset.id;
    const cantidadElemento = button.previousElementSibling; 
    let cantidad = parseInt(cantidadElemento.textContent);
    cantidad++;

    try {
        const actualizarCantidad = await fetch(`http://localhost:3400/carrito/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify({ cantidad }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (actualizarCantidad.ok) {
            console.log('Carrito actualizado correctamente');
            actualizarCantidadElemento(idProducto, cantidad);
        } else {
            console.log('Error al actualizar el carrito');
        }
    } catch (error) {
        console.log('Hubo un error', error);
    }
};

// Actualiza el elemento de cantidad en el DOM
const actualizarCantidadElemento = (idProducto, cantidad) => {
    const cantidadElemento = document.querySelector(`.producto[data-id="${idProducto}"] #cantidad`);
    if (cantidadElemento) {
        cantidadElemento.textContent = `${cantidad}`;
    }
    calcularTotal();
};

// Lista los productos en el carrito
const listarCarrito = (carrito) => {
    contenedor.innerHTML = ''; 
    carrito.forEach(item => {
        const producto = item.productoInfo;
        const cantidad = item.cantidad;

        contenedor.innerHTML += `
            <div class="producto" data-id="${item._id}">
                <h5>${producto.titulo}</h5>
                <button onclick="decreme(event)" data-id="${item._id}">-</button>
                <p type="text" id="cantidad">${cantidad}</p>
                <button onclick="agreg(event)" data-id="${item._id}">+</button>
                <p id="precio">Precio: ${producto.precio}</p>
            </div>
        `;
    });

    // Añade el total después de los productos
    contenedor.innerHTML += `<p id="total">Total: $</p>`;
    calcularTotal();
};

// Calcula el total del carrito y lo muestra en la consola
const calcularTotal = () => {
    const productos = document.querySelectorAll('.producto');
    let total = 0;

    productos.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('#cantidad').textContent);
        const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
        total += cantidad * precio;
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    console.log(`Total del carrito: $${total.toFixed(2)}`);
};

// Obtiene los productos del carrito desde la base de datos
const obtenerCarrito = async () => {
    try {
        const peticion = await fetch('http://localhost:3400/carrito/6692cffb2772b70d5757459a');

        if (!peticion.ok) {
            console.log('Hubo un error al obtener los productos');
            return;
        }

        const response = await peticion.json();
        listarCarrito(response);

    } catch (error) {
        console.log('Hubo un error', error);
    }
};

obtenerCarrito();
