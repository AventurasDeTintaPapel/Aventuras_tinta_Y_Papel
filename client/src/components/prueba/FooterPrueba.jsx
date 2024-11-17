import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";

import "@fontsource/montserrat/700.css";
import { Link } from "react-router-dom";

export function FooterPrueba({ colAndrow }) {
  return (
    <footer className={`${colAndrow}`}>
      <div className="flex flex-wrap">
        {/* Sobre Nosotros */}
        <div className="bg-red-600 ">
          <p>Sobre Nosotros</p>
          <p>Somos tu tienda de confianza para encontrar cómics, mangas y más. Disfruta de los mejores productos del mundo del entretenimiento.</p>
        </div>

        {/* Enlaces Rápidos */}
        <div className="bg-blue-600 h-[50%] flex flex-col">
          <p>Enlaces Rápidos</p>
          <div>
            <Link to={"/"}>Inicio</Link>
            <Link to={"/contactos"}>Contactos</Link>
            <Link to={"/catalogo"}>Catalogo</Link>
            <Link to={"/intarcambio"}>Intercambio</Link>
          </div>
        </div>

        {/* Información */}
        <div className="bg-green-600 h-[50%]">
          <p>Contáctanos</p>
          <div>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>Calle Ficticia 123, Ciudad</span>
            </p>
            <p className="flex items-center gap-2">
              <BsFillTelephoneFill />
              <span>+54 370 1234567</span>
            </p>
            <p className="flex items-center gap-2">
              <IoIosMail />
              <span>info@comicstienda.com</span>
            </p>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="bg-orange-300 h-[50%]">
          <p>Redes Sociales</p>
          <div>
            <a href="#" className="flex items-center gap-2">
              <FaFacebook />
              Facebook
            </a>
            <a href="#" className="flex items-center gap-2">
              <AiFillInstagram />
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2">
              <FaSquareTwitter />
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>&copy; 2024 Comics Tienda. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
