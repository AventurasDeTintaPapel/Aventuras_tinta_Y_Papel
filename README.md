# Aventuras_tinta_Y_Papel

export default function Carrusel() {
const [currentIndex, setCurrentIndex] = useState(0);

// Cantidad de "páginas" en el carrusel (por ejemplo, 3 en este caso)
const totalPaginas = 2;

// Función para mover a la derecha
const moverDerecha = () => {
if (currentIndex < totalPaginas - 1) {
setCurrentIndex(currentIndex + 1);
}
};

// Función para mover a la izquierda
const moverIzquierda = () => {
if (currentIndex > 0) {
setCurrentIndex(currentIndex - 1);
}
};

return (
<>
<div>
{/_ Botones para mover el carrusel _/}
<button onClick={moverIzquierda} className="bg-gray-700 text-white p-2 m-2">
Productos {">"}
</button>
<button onClick={moverDerecha} className="bg-gray-700 text-white p-2 m-2">
Mercancia
</button>
</div>

      {/* Contenedor principal del carrusel */}
      <div className="h-auto overflow-hidden">
        {/* Contenedor que se mueve */}
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }} // Mueve el carrusel según el índice actual
        >
          <ContenedorProductos />
          <ContenedorProductos />
        </div>
      </div>
    </>

);
}

function ContenedorProductos() {
return (
<div className="w-full h-[20vw] bg-blue-400 flex items-center justify-center">
<p>Página 1</p>
</div>
);
}
