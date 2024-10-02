export function Footer() {
  return (
    <footer className="bg-purple-900 col-span-3 row-start-3 text-purple-100">
      <div className="flex">
        <div className="w-[25%] p-[1vw] items-center flex flex-col border-r-[0.2vw] border-r-purple-400">
          <p className="text-[1.5vw] mb-[0.2vw]">Sobre Nosotros</p>
          <p className="text-[1.1vw] text-justify w-[80%]">
            Somos tu tienda de confianza para encontrar cómics, mangas y más. Disfruta de los mejores productos del mundo del entretenimiento.
          </p>
        </div>

        <div className="w-[25%] p-[1vw] items-center flex flex-col border-r-[0.2vw] border-r-purple-400">
          <p className="text-[1.5vw] mb-[0.2vw]">Enlaces Rápidos</p>
          <div className="flex gap-[2vw] ml-[3vw]">
            <div className="flex flex-col text-[1vw]">
              <a className="list-item" href="#">
                Inicio
              </a>
              <a className="list-item" href="#">
                Contactos
              </a>
              <a className="list-item" href="#">
                Libros
              </a>
              <a className="list-item" href="#">
                Mangas
              </a>
            </div>
            <div className="flex flex-col text-[1vw]">
              <a className="list-item" href="#">
                Comics
              </a>
              <a className="list-item" href="#">
                Merch
              </a>
              <a className="list-item" href="#">
                Vender
              </a>
              <a className="list-item" href="#">
                Intercambio
              </a>
            </div>
          </div>
        </div>

        <div className="w-[25%] p-[1vw] items-center flex flex-col border-r-[0.2vw] border-r-purple-400">
          <p className="text-[1.5vw] mb-[0.2vw]">Redes Sociales</p>
          <div className="flex flex-col">
            <a className="text-[1.2vw] list-item" href="#">
              Facebook
            </a>
            <a className="text-[1.2vw] list-item" href="#">
              Instagram
            </a>
            <a className="text-[1.2vw] list-item" href="#">
              Twitter
            </a>
          </div>
        </div>

        <div className="w-[25%] p-[1vw] items-center flex flex-col">
          <p className="text-[1.5vw] mb-[0.5vw]">Contáctanos</p>
          <p className="text-[1.2vw] ml-[1vw]">
            Dirección: Calle Ficticia 123, Ciudad <br />
            Teléfono: +54 370 1234567 <br />
            Email: info@comicstienda.com
          </p>
        </div>
      </div>

      <div className="bg-purple-950 pl-[1vw] py-[0.5vw]">
        <p className="text-[1.2vw]">&copy; 2024 Comi cs Tienda. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
