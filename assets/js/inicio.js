
// declaracion de variables8
const btnLeft = document.querySelector(".btnleft");
const btnRight = document.querySelector(".btnRight");
const carrusel = document.querySelector("#carruseles");
const sliderSection=document.querySelectorAll(".sliderSection");

console.log(btnLeft,btnRight,carrusel)

// evento del carrusel de imagenes
btnLeft.addEventListener('click', (e) => moveToLeft());
btnRight.addEventListener('click', (e) => moveToRight());

setInterval(() => {
    moveToRight()
}, 3000);
let operacion=0;
let whitdImg = 100/sliderSection.length;
let counter=0;
function moveToRight() {
    if(counter>=sliderSection.length-1){
        counter=0;
        operacion=0;   
        carrusel.style.transform = `translate(-${operacion}%)`;
    }else{ 
        counter++;  
        operacion=operacion+whitdImg; 
        carrusel.style.transform = `translate(-${operacion}%)`;
        carrusel.style.transition= "all ease .6s"
    }
}
     console.log(moveToRight() ,counter);
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
const btnI = document.querySelector(".botonINoveddes");
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
        contadorN = tarjetas.length ;
        operacionN = whitdImg2 * (tarjetas.length );
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
    if (contadorN >= tarjetas.length ) {
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
// Variables del carrusel de categorias
const btnImg = document.querySelector(".btnIimagenes");
const btnDImg = document.querySelector(".btnDimagenes");
const carruselCategoria = document.querySelector("#contenedorImagenes");
const imagenes = document.querySelectorAll(".imagenes");

// Eventos
btnImg.addEventListener('click', (e) => moveToIimg());
btnDImg.addEventListener('click', (e) => moveToDimg());

let operacionImg = 0;
let contadorImg = 0;
let whitdImg3 = 100 / imagenes.length-1;

function moveToIimg() {
    contadorImg--;
    if (contadorImg < 0) {
        contadorImg = imagenes.length - 1;
        operacionImg = whitdImg3 * (imagenes.length - 1);
    } else {
        operacionImg -= whitdImg3;
    }
    imagenes.forEach(imagen => {
        imagen.style.transform = `translateX(-${operacionImg}%)`;
        imagen.style.transition = "all ease .6s";
    });
}

function moveToDimg() {
    if (contadorImg >= imagenes.length - 1) {
        contadorImg = 0;
        operacionImg = 0;  
    } else {
        contadorImg++;
        operacionImg = operacionImg + whitdImg3;
    }
    imagenes.forEach(imagen => {
        imagen.style.transform = `translateX(-${operacionImg}%)`;
        imagen.style.transition = "all ease .6s";
    });
}
// Variables del carrusel de 
const btnI2 = document.querySelector(".botonIPreventa");
const btnD2 = document.querySelector(".botonDPreventa");
const carruselPreventa = document.querySelector("#contenedorTarjetas");
const tarjetas2 = document.querySelectorAll(".tarjetas");

// Eventos
btnI.addEventListener('click', (e) => moveToI());
btnD.addEventListener('click', (e) => moveToD());

let operacion2 = 0;
let contador2 = 0;
let whitdImg4 = 100 / tarjetas.length;

function moveToI() {
    contador2--;
    if (contador2 < 0) {
        contador2 = tarjetas.length ;
        operacion2 = whitdImg4 * (tarjetas.length );
        tarjetas.forEach(tarjeta => {
            tarjeta.style.transform = `translate(-${operacion2}%)`;
            tarjeta.style.transition = "all ease .2s";
        });
    } else {
        operacion2 = operacion2 - whitdImg4;
        tarjetas.forEach(tarjeta => {
            tarjeta.style.transform = `translate(-${operacionN}%)`;
            tarjeta.style.transition = "all ease .2s";
        });
    }
}

function moveToD() {
    if (contador2 >= tarjetas.length ) {
        contador2 = 0;
        operacion2 = 0;
    } else {
        contador2++;
        operacion2 = operacion2 + whitdImg2;
    }
    tarjetas.forEach(tarjeta => {
        tarjeta.style.transform = `translate(-${operacion2}%)`;
        tarjeta.style.transition = "all ease .2s";
    });
}
// Variables del carrusel de novedades
// Variables del carrusel de novedades
const btnI3 = document.querySelector(".botonIrecomendados");
const btnD3 = document.querySelector(".botonDrecomendados");
const carruselNovedades3 = document.querySelector("#contenedorTarjetas3");
const tarjetas3 = document.querySelectorAll(".tarjetas");

// Eventos
btnI3.addEventListener('click', (e) => moveToI());
btnD3.addEventListener('click', (e) => moveToD());

let operacion3 = 0;
let contador3 = 0;
let widthImg5 = 100 / tarjetas3.length;

function moveToI() {
    contador3--;
    if (contador3 < 0) {
        contador3 = tarjetas3.length - 1;
        operacion3 = widthImg5 * (tarjetas3.length - 1);
    } else {
        operacion3 = operacion3 - widthImg5;
    }
    tarjetas3.forEach(tarjeta => {
        tarjeta.style.transform = `translateX(-${operacion3}%)`;
        tarjeta.style.transition = "all ease .2s";
    });
}

function moveToD() {
    contador3++;
    if (contador3 >= tarjetas3.length) {
        contador3 = 0;
        operacion3 = 0;
    } else {
        operacion3 = operacion3 + widthImg5;
    }
    tarjetas3.forEach(tarjeta => {
        tarjeta.style.transform = `translateX(-${operacion3}%)`;
        tarjeta.style.transition = "all ease .2s";
    });
}
