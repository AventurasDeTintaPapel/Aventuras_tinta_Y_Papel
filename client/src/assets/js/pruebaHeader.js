const porcentajeDesplazamiento = 30; // 30% del ancho del contenedor
let intervalId = null;

// Función para mover el contenedor específico en la dirección dada
function moverContenedor(contenedor, direccion) {
  const desplazamiento = contenedor.clientWidth * porcentajeDesplazamiento;
  if (direccion === "derecha") {
    contenedor.scrollLeft += desplazamiento;
  } else if (direccion === "izquierda") {
    contenedor.scrollLeft -= desplazamiento;
  }
}

// Función para iniciar el desplazamiento
function iniciarDesplazamiento(contenedor, direccion) {
  if (intervalId === null) {
    intervalId = setInterval(() => moverContenedor(contenedor, direccion), 100);
  }
}

// Función para detener el desplazamiento
function detenerDesplazamiento() {
  clearInterval(intervalId);
  intervalId = null;
}

// Función para manejar el inicio del desplazamiento en dispositivos táctiles
function touchStart(event, contenedor, direccion) {
  event.preventDefault();
  iniciarDesplazamiento(contenedor, direccion);
}

// Función para manejar el final del desplazamiento en dispositivos táctiles
function touchEnd() {
  detenerDesplazamiento();
}

// Selecciona los botones y contenedores por separado
const contenedor1 = document.getElementById("contenedorTarjetas1");
const flechaDerecha1 = document.getElementById("flechaDerecha1");
const flechaIzquierda1 = document.getElementById("flechaIzquierda1");

const contenedor2 = document.getElementById("contenedorTarjetas2");
const flechaDerecha2 = document.getElementById("flechaDerecha2");
const flechaIzquierda2 = document.getElementById("flechaIzquierda2");

// Contenedor 1 - Eventos para ratón
flechaDerecha1.addEventListener("mousedown", () =>
  iniciarDesplazamiento(contenedor1, "derecha")
);
flechaDerecha1.addEventListener("mouseup", detenerDesplazamiento);
flechaDerecha1.addEventListener("mouseleave", detenerDesplazamiento);

flechaIzquierda1.addEventListener("mousedown", () =>
  iniciarDesplazamiento(contenedor1, "izquierda")
);
flechaIzquierda1.addEventListener("mouseup", detenerDesplazamiento);
flechaIzquierda1.addEventListener("mouseleave", detenerDesplazamiento);

// Contenedor 1 - Eventos táctiles
flechaDerecha1.addEventListener("touchstart", (e) =>
  touchStart(e, contenedor1, "derecha")
);
flechaDerecha1.addEventListener("touchend", touchEnd);

flechaIzquierda1.addEventListener("touchstart", (e) =>
  touchStart(e, contenedor1, "izquierda")
);
flechaIzquierda1.addEventListener("touchend", touchEnd);

// Contenedor 2 - Eventos para ratón
flechaDerecha2.addEventListener("mousedown", () =>
  iniciarDesplazamiento(contenedor2, "derecha")
);
flechaDerecha2.addEventListener("mouseup", detenerDesplazamiento);
flechaDerecha2.addEventListener("mouseleave", detenerDesplazamiento);

flechaIzquierda2.addEventListener("mousedown", () =>
  iniciarDesplazamiento(contenedor2, "izquierda")
);
flechaIzquierda2.addEventListener("mouseup", detenerDesplazamiento);
flechaIzquierda2.addEventListener("mouseleave", detenerDesplazamiento);

// Contenedor 2 - Eventos táctiles
flechaDerecha2.addEventListener("touchstart", (e) =>
  touchStart(e, contenedor2, "derecha")
);
flechaDerecha2.addEventListener("touchend", touchEnd);

flechaIzquierda2.addEventListener("touchstart", (e) =>
  touchStart(e, contenedor2, "izquierda")
);
flechaIzquierda2.addEventListener("touchend", touchEnd);
