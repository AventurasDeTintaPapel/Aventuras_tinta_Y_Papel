
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

var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });