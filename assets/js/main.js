// //eventos del header 
// const btnProductos = document.getElementById("BtnProduc");
// const productos = document.getElementById("contenedorProductos");
// const lista = document.getElementById("lista")
// btnProductos.addEventListener("mouseenter", ()=>{
//     if(productos.className == "pepino"){
//         productos.className = "botonesProductos";
//     }else{
//         productos.className = "pepino";
//     }
// })
// declaracion de variables8
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
    if(counter>=sliderSection.length-1){
        counter=0;
        operacion=0;
    }else{ 
        carrusel.style.transform = `translate(-${operacion}%)`;
        counter++;
        operacion=operacion+whitdImg;
        carrusel.style.transition= "all ease .6s"
    }
}

function moveToLeft(){
    counter--;
    if(counter<0){
        counter=sliderSection.length-1;
        operacion= whitdImg*(sliderSection.length-1)
        carrusel.style.transform = `translate(-${operacion}%)`;
    }else{
        operacion=operacion-whitdImg;
        carrusel.style.transform = `translate(-${operacion}%)`;
        carrusel.style.transition= "all ease .6s"
    }
}

// Variables del carrusel de novedades
const btnI = document.querySelector(".botonINovedades");
const btnD = document.querySelector(".botonDNovedades");
const carruselNovedades = document.querySelector("#contenedorTarjetas");
const tarjetas = document.querySelectorAll(".tarjetas");

// Eventos
btnI.addEventListener('click', (e) => moveToI());
btnD.addEventListener('click', (e) => moveToD());

let operacionN = 0;
let contadorN = 0;
let whitdImg2 = 100 / tarjetas.length;

function moveToI() {
    contadorN--;
    if (contadorN < 0) {
        contadorN = tarjetas.length - 1;
        operacionN = whitdImg2 * (tarjetas.length - 1);
        tarjetas.forEach(tarjeta => {
            tarjeta.style.transform = `translate(-${operacionN}%)`;
            tarjeta.style.transition = "all ease .2s";
        });
    } else {
        operacionN = operacionN - whitdImg2;
        tarjetas.forEach(tarjeta => {
            tarjeta.style.transform = `translate(-${operacionN}%)`;
            tarjeta.style.transition = "all ease .2s";
        });
    }
}

function moveToD() {
    if (contadorN >= tarjetas.length - 1) {
        contadorN = 0;
        operacionN = 0;
    } else {
        contadorN++;
        operacionN = operacionN + whitdImg2;
    }
    tarjetas.forEach(tarjeta => {
        tarjeta.style.transform = `translate(-${operacionN}%)`;
        tarjeta.style.transition = "all ease .2s";
    });
}
