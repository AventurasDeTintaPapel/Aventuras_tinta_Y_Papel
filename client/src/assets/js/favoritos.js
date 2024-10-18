const contenedor = document.getElementById('contenedor');

const listarFavoritos =(favoritos)=>{
    contenedor.innerHTML ='';

    favoritos.forEach(elemento => {

        const producto = elemento.productoInfo;
        contenedor.innerHTML +=`
        <div class="producto" >
            <img src="https://www.eleconomista.com.mx/__export/1618813105696/sites/eleconomista/    img/2021/04/19/libros2.jpg_1015297232.jpg" alt="">
            <h5>${producto.titulo}</h5>
            <p id="precio" class="precio">precio:${producto.precio}</p>
            <button onclick="eliminar(event)"data-id="${elemento._id}" class="boton">Borrar</button>
        </div>
        `

    });
}
const eliminar = async(event)=>{
    event.preventDefault();
    const id= event.target.dataset.id;
    const peticion = fetch(`http://localhost:3400/favoritos/${id}`,{
        method:'DELETE',
    })
    alert('se elimino el producto de favoritos');
    console.log(id)
    console.log('Producto eliminado',id);
    obtenerFavs();
}
const obtenerFavs = async()=>{
    const peticion = await fetch(`http://localhost:3400/favoritos/6692cf802772b70d57574598`);
    try{
        if(!peticion.ok){
            console.log('Hubo un error al obtener los productos de favoritos');
            return;
        }

        const response = await peticion.json();
        listarFavoritos(response)
        
    }catch(error){
        console.log(error)
    }
}
obtenerFavs();