const contenedor = document.getElementById('contenedor');
const contenedorAside = document.getElementById("contenedorAside");

// Función para descontar la cantidad del producto
const decreme = async (event) => {
    const button = event.target;
    const idProducto = button.dataset.id;
    const cantidadElemento = button.nextElementSibling; 
    let cantidad = parseInt(cantidadElemento.textContent);

    if (cantidad > 1) {
        cantidad--; 
        cantidadElemento.textContent = cantidad; 
    } else {
        console.log('La cantidad no puede ser menor que 1');
        return; 
    }

    try {
        const productos = document.querySelectorAll('.producto');
        let totalFinal = 0;

        productos.forEach(producto => {
            if (producto.dataset.id === idProducto) {
                const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
                totalFinal = precio * cantidad;
                console.log(`Precio: ${precio}, Total Final: ${totalFinal}`);
            }
        });

        // Actualiza la cantidad y el total en la base de datos
        const actualizarCantidad = await fetch(`http://localhost:3400/carrito/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify({ cantidad, totalFinal }),
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
    cantidadElemento.textContent = cantidad; 

    try {
        const productos = document.querySelectorAll('.producto');
        let totalFinal = 0;

        // Realizar la solicitud fetch para actualizar el carrito en la base de datos
        const actualizarCantidad = await fetch(`http://localhost:3400/carrito/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify({ cantidad, totalFinal }),
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
        const imagenSrc = `http://localhost:3400${producto.imagen}`
        contenedor.innerHTML += `
            <div class="producto" >
                <img src="${imagenSrc}" alt="">
                <div class="infoCarrito">
                    <div class="titulosProducto">
                    <h5>${producto.titulo}</h5>
                    <p id="precio" class="precioIndividual">Precio: ${producto.precio}</p>
                    <button onclick="eliminarEle(event)" data-id="${item._id}">eliminar</button>
                </div>
                <div class="cantidadProducto">
                    <button onclick="decreme(event)" data-id="${item._id}" class="boton">-</button>
                    <p type="text" id="cantidad" class="">${cantidad}</p>
                    <button onclick="agreg(event)" data-id="${item._id}" class="boton">+</button>
                </div>      
            </div>
        `;
    });


    // Aside

    contenedorAside.innerHTML += `
    <h2>Resumen De Compra</h2>
    <p id="total" class="precioTotal">Total: $</p> 
    <button onclick="añadirPed(event)" >confirmar</button>`    
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
};
// Función para eliminar un elemento del carrito
const eliminarEle = async (event) => {
    const id = event.target.dataset.id;
   
    try {
        const response = await fetch(`http://localhost:3400/carrito/elemento/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado correctamente');
            console.log('Producto eliminado', id);
            obtenerCarrito();
        } else {
            alert('Error al eliminar el producto');
            console.error('Error al eliminar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Ocurrió un error al intentar eliminar el producto.');
    }
};

// Función para añadir a pedidos
const añadirPed = async (event) => {
    let totalFinal = 0;
    let idCarrito = "";

    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('#cantidad').textContent);
        const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
        totalFinal += cantidad * precio;
        idCarrito = producto.querySelector('.boton').dataset.id;
    });

    console.log('ID del producto:', idCarrito);
    console.log('Total final:', totalFinal);

    const isComplete = "en proceso";

    try {
        const cargarPedido = await fetch(`http://localhost:3400/pedidos`, {
            method: 'POST',
            body: JSON.stringify({ idCarrito, isComplete, totalFinal }),
            headers: { 
                'Content-Type': 'application/json'
            }
        });

        if (cargarPedido.ok) {
            alert('Se ha completado su compra');
            const token = localStorage.getItem('token');
            const elimCar = await fetch(`http://localhost:3400/carrito`, {
                method: 'DELETE',
                headers: { 
                    'token': token 
                }
            });

            if (elimCar.ok) {
                console.log('Carrito eliminado');
                obtenerCarrito();
            } else {
                console.error('Error al eliminar el carrito:', elimCar.statusText);
                alert('Error al eliminar el carrito.');
            }
        } else {
            alert('Error al completar la compra');
            console.error('Error al completar la compra:', cargarPedido.statusText);
        }
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        alert('Ocurrió un error al intentar procesar la compra.');
    }
};

// Obtiene los productos del carrito desde la base de datos
const obtenerCarrito = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token){
            contenedor.innerHTML = ''; 
                contenedor.innerHTML += `
                    <h5>El carrito esta vacio</h5>
                `;
        }else{
            const token = localStorage.getItem('token');
            const peticion = await fetch('http://localhost:3400/carrito/',{
                method:'GET',
                headers: { 
                    'token': token 
                }
            });
    
            if (!peticion.ok) {
                console.log('Hubo un error al obtener los productos');
                return;
            }
    
            const response = await peticion.json();
            listarCarrito(response);
        }
        

    } catch (error) {
        console.log('Hubo un error', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    obtenerCarrito();
});
