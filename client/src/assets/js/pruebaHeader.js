const flechaDerecha = document.getElementById("flechaDerecha")
const flechaIzquida = document.getElementById("flechaIzquierda")
const contenedor  = document.getElementById("constendorTarjetas")

const desplazamieno = 228


//mover a la derecha
flechaDerecha.addEventListener("click", () => {
  contenedor.scrollLeft += desplazamieno;
});

// Mover a la izquierda
flechaIzquida.addEventListener("click", () => {
  contenedor.scrollLeft -= desplazamieno;
});

