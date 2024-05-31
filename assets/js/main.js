/*botones*/

const btnProductos = document.getElementById("BtnProduc");
const productos = document.getElementById("contenedorProductos");

// btnProductos.addEventListener("click", function(){

//     partesProductos.innerHTML= ""

//     productos.appendChild(partesProductos)

// })
const lista = document.getElementById("lista")
btnProductos.addEventListener("mouseenter", ()=>{
    if(productos.className == "pepino"){
        productos.className = "botonesProductos";
    }else{
        productos.className = "pepino";
    }

})


