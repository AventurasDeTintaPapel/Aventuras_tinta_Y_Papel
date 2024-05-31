/*botones*/

const btnProductos = document.getElementById("BtnProduc");
const bontonUsaurio = document.getElementById("botonUsuario");

/*objetos modificados*/ 
const productos = document.getElementById("contenedorProductos");
const lista = document.getElementById("lista")
const usario = document.getElementById("contenedorUsuario")

/*eventos*/ 
btnProductos.addEventListener("mouseenter", ()=>{
    if(productos.className == "productosDespegableNotVisible"){
        productos.className = "botonesProductos";
    }else{
        productos.className = "productosDespegableNotVisible";
    }

})

bontonUsaurio.addEventListener("click", ()=>{
    if(usario.className == "usuarioDespegableNotVisible"){
        usario.className = "usuarioDespegableVisible";
    }else{
        usario.className = "usuarioDespegableNotVisible";
    }
})
