
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

const botonActivacion = document.getElementById("TitulosAsideDes")
const iconosManual = document.querySelector(".iconosManual");
const NAV = document.querySelector(".Nav");
const botonNav = document.querySelector(".botonNav");
const lupitaPepino = document.getElementById("lupitaPepino")

botonActivacion.addEventListener("click", ()=>{

    const categoriasFiltros = document.getElementById("categoriasFiltros")

    if (categoriasFiltros.className == "categoriasFiltrosOff"){
        categoriasFiltros.className = "categoriasFiltrosOn"
    }
    else{
        categoriasFiltros.className = "categoriasFiltrosOff"
    }
})


iconosManual.addEventListener("click",()=>{
    iconosManual.classList.toggle("active");
    NAV.classList.toggle("active");
    botonNav.classList.toggle("active")
})



lupitaPepino.addEventListener("click", ()=>{

    const buscador = document.getElementById("barraBuscadorNAV")

    buscador.classList.toggle("ON");

} )