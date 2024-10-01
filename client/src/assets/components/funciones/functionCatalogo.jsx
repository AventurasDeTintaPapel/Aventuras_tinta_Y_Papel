function tarjeta({ imagen, titulo, precio }) {
  return (
    <div className="contenedor">
      <div className="contenedorImg">
        <img src={imagen} alt="" />
      </div>
      <div className="contenedorInfo">
        <p>{titulo}</p>
        <p>{precio}</p>
      </div>
      <div className="contenedorBotones">
        <button>Detalles</button>
        <button>Comprar</button>
      </div>
    </div>
  );
}
