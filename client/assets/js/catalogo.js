const contenedorComics = document.getElementById('Comics');
//funcion para listar los comics

const listarComics = (productos)=>{
    contenedorComics.innerHTML='';
    productos.forEach(producto=>{
         const imagenSrc = `http://localhost:3400${producto.imagen}`;
        
            contenedorComics.innerHTML +=`
                        <div class="producto">
                <img src="${imagenSrc}" alt="">
                <h5>${producto.titulo} <i class="inconoFavoritos fi-rs-heart favoritos"></i></h5>
                <p>Precio:${producto.precio} </p>
                <div class="botonesProducto">
                    <a href="">Detalles</a>
                    <button id="comprar" onclick=agregarCarrito(event) data-id=${producto._id}>Comprar</button>
                </div>
            </div>
            `
        })
}

const obtenerProductos = async ()=>{
    try{
        const peticion = await fetch('http://localhost:3400/catalogo/comics');
        
        if(!peticion.ok){
            console.log('hubo un error al obtener los productos');
        }

        const response = await peticion.json();
        console.log(response);
        listarComics(response)
    }catch(error){
        console.error('Error al obtener los productos',error);
    }
}
 
document.addEventListener('DOMContentLoaded', obtenerProductos);