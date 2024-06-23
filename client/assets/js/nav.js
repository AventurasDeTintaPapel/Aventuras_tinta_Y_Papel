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