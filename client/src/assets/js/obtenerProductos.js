const listaProductos = document.getElementById('listaProductos');

// Función para listar los productos
const listarProductos = (data) => {
    listaProductos.innerHTML = '';
    data.forEach(productos => {
        const imagenSrc = `http://localhost:3400${productos.imagen}`
        const descripcion = productos.descripcion;
        const longitudDescripcion = descripcion.length;
        const longitudTruncada = Math.ceil(longitudDescripcion * 0.02);
        const descripcionTruncada = descripcion.substring(0, longitudTruncada);
        console.log(imagenSrc)
        listaProductos.innerHTML += `<tr>
            
            <td><img class="imagen" src="${imagenSrc}" width="80"></td>
            <td>${productos.titulo}</td>
            <td>${productos.autor}</td>
            <td>${descripcionTruncada}...</td>
            <td>${productos.categoria}</td>
            <td>${productos.numeroEdicion}</td>
            <td>${productos.tipo}</td>
            <td>${productos.idioma}</td>
            <td>${productos.precio}</td>
            <td>${productos.cantidad}</td>
             <td>
             <div class="acciones">
             <a href="http://127.0.0.1:5500/client/gestion/editarProducto.html" class="btnEditar">Editar</a>
            <button onclick=eliminarProducto(event) class="btnEliminar" data-id="${productos._id}">Eliminar</button>
             </div>               
                        </td>
        </tr>`;
        console.log(productos._id);
    });
};

const obtenerProductos = async () => {
    try {
        const peticion = await fetch('http://localhost:3400/api/productos');

        if (!peticion.ok) {
            console.log('hubo un error al obtener los productos')
        }

        const response = await peticion.json(); 

        listarProductos(response);
   
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};
function eliminarProducto(event) {
   
    event.preventDefault();
    const id = event.target.dataset.id
    const peticion = fetch(`http://localhost:3400/api/productos/eliminar/${id}`, {
        method: 'DELETE',
    })
        alert('producto eliminado correctamente');
        console.log('Producto eliminado',id);
        obtenerProductos(); 
}

document.addEventListener('DOMContentLoaded', obtenerProductos());


