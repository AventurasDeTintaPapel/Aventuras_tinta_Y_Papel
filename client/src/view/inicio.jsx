import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Carrusel, { Carruseltarjetas } from "../components/objetosVariasdos";
import { Nav } from "../components/Nav";
import "@fontsource/baloo-2/700.css";

function Separador({ texto }) {
  return <p className="text-white text-[2.5vw] font-semibold text-center bg-gradient-to-r from-blue-950 to-fuchsia-400 w-full">{texto}</p>;
}

export function Inicio() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] bg-gradient-to-br from-white to-purple-300">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />

      <main className="row-start-3" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        {/* carrusel */}
        <Carrusel />

        <div className="flex flex-col items-center gap-[2vw] my-[2vw]">
          {/* separador */}
          <Separador texto={"LO MAS VENDIDO"} />

          {/* contendor de tarjetas y flechas 1 */}
          <Carruseltarjetas />

          {/* algo */}
          <div className="flex py-[2vw] gap-[1vw] w-auto">
            <div className="bg-purple-500 rounded-xl">
              <p className="text-center text-[2.5vw] bg-purple-800 rounded-t-xl text-purple-100 font-medium">Comics</p>
              <div className="contenedorImg w-[18.3vw] h-[10vw] px-[1vw] py-[0.5vw]">
                <img
                  className="w-full h-full rounded-b-xl"
                  src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/08/Marvel-Comics-celebras-al-MCU-con-una-serie-de-portadas-variantes-dedicadas-a-la-Saga-del-Infinito-compressed.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="bg-purple-500 rounded-xl">
              <p className="text-center text-[2.5vw] rounded-t-xl bg-purple-800 text-purple-100 font-medium">Mangas</p>
              <div className="contenedorImg w-[18.3vw] h-[10vw] px-[1vw] py-[0.5vw]">
                <img
                  className="w-full h-full rounded-b-xl"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVq7jFvxIqDff6xDdMQbYaT5hsvp67FTysg&s"
                  alt=""
                />
              </div>
            </div>
            <div className="bg-purple-500 rounded-xl">
              <p className="text-center text-[2.5vw] rounded-t-xl bg-purple-800 text-purple-100 font-medium">Libros</p>
              <div className="contenedorImg w-[18.3vw] h-[10vw] px-[1vw] py-[0.5vw]">
                <img
                  className="w-full h-full rounded-b-xl"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqo7ITwJ3JW8cVR3KYlLyl6wlJedAi6bjKpA&s"
                  alt=""
                />
              </div>
            </div>
            <div className="bg-purple-500 rounded-xl">
              <p className="text-center text-[2.5vw] rounded-t-xl bg-purple-800 text-purple-100 font-medium">Merch</p>
              <div className="contenedorImg w-[18.3vw] h-[10vw] px-[1vw] py-[0.5vw]">
                <img className="w-full h-full rounded-b-xl" src="https://m.media-amazon.com/images/I/61WWpQv+snL._AC_SL1000_.jpg" alt="" />
              </div>
            </div>
          </div>

          {/* separador novedades */}
          <Separador texto={"NOVEDADES"} />

          {/* contendor de tarjetas y flechas 2 */}
          <Carruseltarjetas />
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}