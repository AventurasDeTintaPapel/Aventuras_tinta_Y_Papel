const listaProductos = document.getElementById('listaProductos');

// Función para listar los productos
const listarProductos = (data) => {
    listaProductos.innerHTML = '';
    data.forEach(productos => {
        const imagenSrc = `http://localhost:3400${productos.imagen}`
        const descripcion = productos.descripcion;
        const longitudDescripcion = descripcion.length;
        const longitudTruncada = Math.ceil(longitudDescripcion * 0.05);
        const descripcionTruncada = descripcion.substring(0, longitudTruncada);
        console.log(imagenSrc)
        listaProductos.innerHTML += `<tr>
            
            <td><img class="imagen" src="${imagenSrc}" width="80"></td>
            <td>${productos.nombre}</td>
            <td>${productos.autor}</td>
            <td>${descripcionTruncada}...</td>
            <td>${productos.categoria}</td>
            <td>${productos.numeroEdicion}</td>
            <td>${productos.tipo}</td>
            <td>${productos.idioma}</td>
            <td>${productos.precio}</td>
            <td>${productos.cantidad}</td>
             <td>
             <a href="http://localhost:3000/reserva/editar/${productos.id}" class="btn btn-primary btn-sm agregar">Editar</a>
                            <button onclick=eliminarReservas(event) class="btn btn-danger btn-sm" data-id="${productos.id}">Eliminar</button>
                            
                        </td>
        </tr>`;
    });
};

const obtenerProductos = async () => {
    try {
        const peticion = await fetch('http://localhost:3400/productos');

        // Asegúrate de que la petición fue exitosa
        if (!peticion.ok) {
            throw new Error('Network response was not ok');
        }

        const response = await peticion.json(); 

        listarProductos(response);
        console.log(response);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};


document.addEventListener('DOMContentLoaded', obtenerProductos);
