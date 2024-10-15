import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import "@fontsource/baloo-2/700.css";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export function DetallesProductos() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={" row-start-2"} />
      <main className="col-start-1 row-start-3 py-[2vw]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="bg-white w-full h-full grid grid-cols-[10%_20%_60%_10%] grid-rows-[auto_auto_auto]">
          <div className="col-start-2 row-start-1 p-[2vw] bg-red-400">
            <img
              className="w-full h-full"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyegUmzcj5yafPdmZCC51BjRCMSrpWrEmToE17rFTVf5QcrEyJK2rNOUspfbUdHtuU_De6LZrn8w5m47F3LbCoI2rdJ57SExBdWhcbfDwSF00MR5_whfAPjsO42EiySBHN3D2A_IcynYO6/s1600/BAKUMAN-20-678x1024.jpg"
              alt=""
            />
          </div>
          <div className="col-start-3 row-start-1 bg-green-400 pl-[2vw] flex flex-col justify-around">
            <div className="space-y-[1vw]">
              <p className="text-[2.8vw]">Manga Desconosido usado como ejemplo</p>
              <div className="ml-[1vw] space-y-[1vw]">
                <p className="text-[1.5vw]">Tipo: Manga</p>
                <p className="text-[1.5vw]">Autor: Nombre Inventado</p>
                <p className="text-[1.5vw]">Precio: $2000</p>
              </div>
            </div>
            <div className="flex gap-[2vw]">
              <button className="text-[2vw] bg-red-500 flex justify-center items-center rounded-[0.6vw] hover:bg-blue-500 h-[3vw] w-[10vw] transition-all ease-in-out duration-300 hover:text-white">
                Comprar
              </button>
              <VolverCatalogo />
            </div>
          </div>
          <div className="col-start-2 col-span-2 pl-[2vw] bg-yellow-300 row-start-2 py-[1vw]">
            <p className="text-[1.9vw]">Adelanto de lo que va leer: </p>
            <p className="w-[95%] pl-[1vw] pt-[1vw] text-[1.2vw]">
              CELEBRANDO EL 40 ANIVERSARIO DE CARAVANA DEL VALOR, LOS EWOKS REGRESAN EN UNA MINISERIE TOTALMENTE NUEVA AMBIENTADA TRAS LOS
              ACONTECIMIENTOS DE EL RETORNO DEL ¡JEDI! Un equipo de CAZADORES DE BOTAS y carroñeros liderados por el Imperio llegan a la Luna Forestal
              de Endor en busca de un alijo secreto de armamento imperial. imperial. ¿Están preparados para enfrentarse a los Ewoks listos para la
              batalla que acabaron con tantos de sus filas? ¿Quién es el misterioso nuevo guerrero Ewok que regresa a la aldea del Árbol Brillante, y
              ¿cuál es su conexión con WICKET W. WARRICK?
            </p>
          </div>
          <div className="col-start-2 col-span-2 pl-[4vw] space-y-[1vw] py-[1vw] bg-blue-300 row-start-3">
            <div className="flex gap-[0.5vw]">
              <FaStar className="text-[2.5vw]" />
              <FaStar className="text-[2.5vw]" />
              <FaStar className="text-[2.5vw]" />
              <FaRegStar className="text-[2.5vw]" />
              <FaRegStar className="text-[2.5vw]" />
            </div>
            <button className="flex items-center gap-[0.3vw]">
              <span className="text-[1.5vw]">Comentarios</span>
              <IoIosArrowDown className="text-[1.8vw]" />
            </button>
          </div>
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}

function VolverCatalogo() {
  return (
    <a
      href="#"
      className="bg-red-500 flex justify-center gap-[0.5vw] items-center rounded-[0.6vw] hover:bg-blue-500 h-[3vw] w-[17vw] transition-all ease-in-out duration-300 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[1.7vw] mb-[0.3vw] group-hover:text-white" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10 2a1 1 0 0 0-1.79-.614l-7 9a1 1 0 0 0 0 1.228l7 9A1 1 0 0 0 10 20v-3.99c5.379.112 7.963 1.133 9.261 2.243c1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 0 0 1.981-.122c.171-2.748-.086-6.73-2.027-10.061C19.087 8.768 15.695 6.282 10 6.022z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-[1.5vw] group-hover:text-white">Volver a Catalogo</span>
    </a>
  );
}
