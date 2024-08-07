//funcionalidades de los iconos
const token = localStorage.getItem('token');
const favorito = document.querySelectorAll('.inconoFavoritos');

if(!token){
    document.querySelector('.contenedorProductos').addEventListener('click', (event) => {
        alert('Debe registrase para poder  realizar esa tarea')
    });
  
            const comprarIcons = document.querySelectorAll('#comprar');
        
        comprarIcons.forEach(function(icon) {
                icon.addEventListener('click', function() {
        lert('Debe registrase para poder  realizar esa tarea');
                });
        });
 
}else{
     // Seleccionamos el contenedor de los productos para la delegación de eventos
     document.querySelector('.contenedorProductos').addEventListener('click', (event) => {
        // Verificamos si el elemento clicado tiene la clase 'favoritos'
            if (event.target.classList.contains('favoritos')) {
                let favorito = event.target;
    
            // Alternamos las clases para cambiar el ícono
                if (favorito.classList.contains('fi-rs-heart')) {
                favorito.classList.remove('fi-rs-heart');
                favorito.classList.add('fi-ss-heart');
                } else {
                    favorito.classList.remove('fi-ss-heart');
                    favorito.classList.add('fi-rs-heart');
    
                }
            }   
        });
        document.addEventListener('DOMContentLoaded', function() {
            const comprarIcons = document.querySelectorAll('#comprar');
        
            comprarIcons.forEach(function(icon) {
                icon.addEventListener('click', function() {
                    alert('Se agregó al carrito');
                });
            });
        });
}
