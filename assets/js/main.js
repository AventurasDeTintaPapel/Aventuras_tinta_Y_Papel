//eventos del header 
const btnProductos = document.getElementById("BtnProduc");
const productos = document.getElementById("contenedorProductos");
const lista = document.getElementById("lista")
btnProductos.addEventListener("mouseenter", ()=>{
    if(productos.className == "pepino"){
        productos.className = "botonesProductos";
    }else{
        productos.className = "pepino";
    }

})
// declaracion de variables
const btnLeft = document.querySelector(".btnleft");
const btnRight = document.querySelector(".btnRight");
const carrusel = document.querySelector("#carruseles");
const sliderSection=document.querySelectorAll(".sliderSection");

console.log(btnLeft,btnRight,carrusel)

// evento del carrusel de imagenes
btnLeft.addEventListener('click', (e) => moveToLeft());
btnRight.addEventListener('click', (e) => moveToRight());
let operacion=0;

let whitdImg = 100/sliderSection.length;
let counter=0;
function moveToRight() {
     if(counter>=sliderSection.length){
        counter=0;
        operacion=0;
     }else{ 
         carrusel.style.transform = `translate(-${operacion}%)`;
        counter++;
        operacion=operacion+25;
        carrusel.style.transition= "all ease .6s"
     }
     console.log("si")
        console.log(counter);
        
       
      
    // }  
}

function moveToLeft(){
    operacion=operacion-25;
    carrusel.style.transform = `translate(-${operacion}%)`;
    carrusel.style.transition= "all ease .6s"
}


