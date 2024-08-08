const contenedor = document.getElementById('contenedor');
const contenedorAside = document.getElementById(`contenedorAside`)

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
    let sumaTotalCantidad = 0;
    carrito.forEach(item => {
        const producto = item.productoInfo;
        const cantidad = item.cantidad;

        sumaTotalCantidad += cantidad;


        contenedor.innerHTML += `
            <div class="producto" data-id="${item._id}">
                <img src="https://www.eleconomista.com.mx/__export/1618813105696/sites/eleconomista/img/2021/04/19/libros2.jpg_1015297232.jpg" alt="">
                    <h5>${producto.titulo}</h5>
                    <p id="precio" class="precioIndividual">Precio: ${producto.precio}</p>
                        <div class="cantidadProducto">
                            <button onclick="decreme(event)" data-id="${item._id}" class="boton">-</button>
                            <p type="text" id="cantidad" class="">${cantidad}</p>
                            <button onclick="agreg(event)" data-id="${item._id}" class="boton">+</button>
                        </div>
            </div>
        `;
    });

    // Aside

    //sumar la cantidad de producto

        contenedorAside.innerHTML += `
            <h2>Resumen De Compra</h2>
            <p>Producto:${sumaTotalCantidad}</p>
            <button>Continuar Compra</button>
            <p id="total" class="precioTotal">Total:  $</p>`;
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
