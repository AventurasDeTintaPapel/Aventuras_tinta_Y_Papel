import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";

import "@fontsource/baloo-2/700.css";

export function Footer() {
  return (
    <footer className="row-start-4  col-span-2">
      <div className="bg-purple-900 text-purple-100" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="justify-center grid-cols-[1fr_1fr_1fr_1fr] grid space-y-[2vw] pb-[2vw]">
          {/* sobre nosotros */}
          <div className=" flex flex-col ml-[5vw] mt-[2vw]">
            <p className="text-[1.3vw] text-start font-semibold mb-[0.4vw]">Sobre Nosotros</p>
            <p className="w-[16vw] text-[1vw] text-purple-200 ">
              Somos tu tienda de confianza para encontrar cómics, mangas y más. Disfruta de los mejores productos del mundo del entretenimiento.
            </p>
          </div>

          {/* rutass rapidas */}
          <div className=" flex flex-col ml-[5vw]">
            <p className="text-[1.3vw] font-semibold mb-[0.2vw] ">Enlaces Rápidos</p>
            <div className="grid grid-cols-[7vw_9vw] gap-[0.3vw] ">
              {["Inicio", "Contactos", "Libros", "Mangas", "Comics", "Merch", "Vender", "Intercambio"].map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`} className="text-[1vw] list-item ml-[1vw]">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* redes sociales */}
          <div className=" flex flex-col ml-[5vw]">
            <p className="text-[1.3vw] font-semibold mb-[0.3vw]">Redes Sociales</p>

            <div className="space-y-[1vw] ml-[0.2vw]">
              <a className="text-[1vw] flex gap-[1vw] items-center" href="#">
                <FaFacebook className="text-[1.4vw]" />
                Facebook
              </a>

              <a className="text-[1vw] flex gap-[1vw] items-center" href="#">
                <AiFillInstagram className="text-[1.4vw]" />
                Instagram
              </a>

              <a className="text-[1vw] flex gap-[1vw] items-center" href="#">
                <FaSquareTwitter className="text-[1.4vw]" />
                Twitter
              </a>
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col ml-[5vw]">
            <p className="text-[1.3vw] mb-[0.5vw] font-semibold">Contáctanos</p>
            <div className="space-y-[1vw] ml-[0.2vw]">
              <p className="flex items-center gap-[1vw] ">
                <FaMapMarkerAlt className="text-[1.4vw]" />
                <span className="text-[1vw] mb-[0.2vw]">Calle Ficticia 123, Ciudad</span>
              </p>
              <p className="flex items-center gap-[1vw] ">
                <BsFillTelephoneFill className="text-[1.4vw]" />
                <span className="text-[1vw] mb-[0.2vw]">+54 370 1234567</span>
              </p>
              <p className="flex items-center gap-[1vw]">
                <IoIosMail className="text-[1.4vw]" />
                <span className="text-[1vw] mb-[0.2vw]">info@comicstienda.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-950 py-[1vw] space-y-[0.5vw] text-purple-100" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <p className="text-[1.3vw] font-semibold text-center">&copy; 2024 Comics Tienda. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-[2vw]">
          <a className="opacity-80 text-[1vw]" href="#">
            Terminos de Servicios
          </a>
          <a className="opacity-80 text-[1vw]" href="#">
            Politicas de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
