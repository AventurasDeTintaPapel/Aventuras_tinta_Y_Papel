const botonActivacion = document.getElementById("TitulosAsideDes")

botonActivacion.addEventListener("click", ()=>{

    const categoriasFiltros = document.getElementById("categoriasFiltros")

    if (categoriasFiltros.className == "categoriasFiltrosOff"){
        categoriasFiltros.className = "categoriasFiltrosOn"
    }
    else{
        categoriasFiltros.className = "categoriasFiltrosOff"
    }
})
