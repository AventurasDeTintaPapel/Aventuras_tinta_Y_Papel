const contenedor = document.getElementById('contenedor');

// Función para descontar la cantidad del producto
const decreme = async (event) => {
    const button = event.target;
    const idProducto = button.dataset.id;
    const cantidadElemento = button.nextElementSibling; 
    let cantidad = parseInt(cantidadElemento.textContent);

    if (cantidad > 1) {
        cantidad--;
    }

    try {
        const productos = document.querySelectorAll('.producto');
        let totalFinal = 0;
        //funcion para obtener y calcular el precio por producto
        productos.forEach(producto => {
            if (producto.dataset.id === idProducto) {
                const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
                console.log(precio);
                totalFinal = precio * cantidad;
                console.log(totalFinal)
            }
        });
        //funcion para actualizar la cantidad del carrito
        const actualizarCantidad = await fetch(`http://localhost:3400/carrito/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify({ cantidad,totalFinal }),
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
    cantidadElemento.textContent = cantidad; // Actualiza la cantidad en la interfaz de usuario

    try {
        const productos = document.querySelectorAll('.producto');
        let totalFinal = 0;

        productos.forEach(producto => {
            if (producto.dataset.id === idProducto) {
                const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
                console.log(precio);
                totalFinal = precio * cantidad; // Calcular el precio total basado en la cantidad actualizada
                console.log(totalFinal)
            }
        });

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

        contenedor.innerHTML += `
            <div class="producto" >
                <img src="https://www.eleconomista.com.mx/__export/1618813105696/sites/eleconomista/    img/2021/04/19/libros2.jpg_1015297232.jpg" alt="">
                <div class="infoCarrito">
                <h5>${producto.titulo}</h5>
                <p id="precio" class="precioIndividual">Precio: ${producto.precio}</p>
                <div class="cantidadProducto">
                <button onclick="decreme(event)" data-id="${item._id}" class="boton">-</button>
                <p type="text" id="cantidad" class="">${cantidad}</p>
                <button onclick="agreg(event)" data-id="${item._id}" class="boton">+</button>
                </div>
                </div>
            </div>
        `;
      
    });
    // Añade el total después de los productos
    contenedor.innerHTML += `<p id="total" class="precioTotal">Total: $</p> 
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

//funcion para añadir a pedidos
const añadirPed =async(event)=>{
    const btn = event.target;
    let total =0
    let idCarrito = ""
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('#cantidad').textContent);
        const precio = parseFloat(producto.querySelector('#precio').textContent.replace('Precio: ', ''));
        total += cantidad * precio;
        idCarrito = producto.querySelector('.boton').dataset.id;
      
    });
    console.log('ID del producto:', idCarrito);
    console.log(total)  
    const isComplete ="en proceso"  
    try{
        const cargarPedido = await fetch(`http://localhost:3400/pedidos`, {
            method: 'POST',
            body: JSON.stringify({ idCarrito,isComplete }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(cargarPedido.ok){
            alert('Se ha completado su compra')
        }
    }catch(error){

    }
}

// Obtiene los productos del carrito desde la base de datos
const obtenerCarrito = async () => {
    try {
        const peticion = await fetch('http://localhost:3400/carrito/6692cffb2772b70d5757459a',);

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
