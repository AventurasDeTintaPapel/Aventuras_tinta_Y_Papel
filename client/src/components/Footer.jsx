import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoRemoveOutline } from "react-icons/io5";

export function Footer() {
  return (
    <footer className="text-purple-100">
      <div className="bg-purple-900 py-[2vw] px-[3.5vw] space-y-[2vw]">
        <div className="flex justify-center gap-[10vw]">
          {/* sobre nosotros */}
          <div className="w-[30vw] flex flex-col pt-[1vw]">
            <p className="text-[1.5vw] text-start font-semibold mb-[0.2vw]">
              Sobre Nosotros
            </p>
            <p className="w-[30vw] text-[1.3vw] text-purple-200 ">
              Somos tu tienda de confianza para encontrar cómics, mangas y más.
              Disfruta de los mejores productos del mundo del entretenimiento.
            </p>
          </div>

          {/* rutass rapidas */}
          <div className=" flex flex-col">
            <p className="text-[1.5vw] font-semibold mb-[0.2vw] ">
              Enlaces Rápidos
            </p>
            <div className="grid grid-cols-[15vw_9vw] gap-[0.5vw]">
              {[
                "Inicio",
                "Contactos",
                "Libros",
                "Mangas",
                "Comics",
                "Merch",
                "Vender",
                "Intercambio",
              ].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-[1.3vw] hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-[12vw]">
          {/* redes sociales */}
          <div className="w-[28vw] space-y-[1vw]">
            <p className="text-[1.5vw] font-semibold mb-[0.2vw] w-[30vw]">
              Redes Sociales
            </p>

            <div className="space-y-[1vw]">
              <div className="flex gap-[1vw]  items-center">
                <FaFacebook />
                <a className="text-[1.2vw]" href="#">
                  Facebook
                </a>
              </div>

              <div className="flex gap-[1vw] items-center">
                <AiFillInstagram />
                <a className="text-[1.2vw]" href="#">
                  Instagram
                </a>
              </div>

              <div className="flex gap-[1vw] items-center">
                <FaSquareTwitter />
                <a className="text-[1.2vw]" href="#">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          {/* info */}
          <div className="space-y-[1vw] w-[25vw] ">
            <p className="text-[1.5vw] mb-[0.5vw] font-semibold">Contáctanos</p>
            <div className="space-y-[0.5vw]">
              <p className="flex items-center gap-[1vw] ">
                <FaMapMarkerAlt size={20} />
                <span className="text-[1.3vw] mb-[0.2vw]">
                  Calle Ficticia 123, Ciudad
                </span>
              </p>
              <p className="flex items-center gap-[1vw] ">
                <BsFillTelephoneFill size={20} />
                <span className="text-[1.3vw] mb-[0.2vw]">+54 370 1234567</span>
              </p>
              <p className="flex items-center gap-[1vw]">
                <IoIosMail size={20} />
                <span className="text-[1.3vw] mb-[0.2vw]">
                  info@comicstienda.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <IoRemoveOutline size={0.5} />

      <div className="bg-purple-950 py-[1.5vw]">
        <p className="text-[1.4vw] font-semibold text-center">
          &copy; 2024 Comics Tienda. Todos los derechos reservados.
        </p>
        <div className="flex justify-center gap-[2vw] mt-[2vw]">
          <a className="opacity-80" href="#">
            Terminos de Servicios
          </a>
          <a className="opacity-80" href="#">
            Politicas de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
