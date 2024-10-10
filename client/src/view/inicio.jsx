import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import CarruselReact, { Carruseltarjetas } from "../components/objetosVariasdos";

function Separador({ texto }) {
  return <p className="text-purple-950 text-[2.5vw] font-semibold text-center bg-purple-100 w-full">{texto}:</p>;
}

export function Inicio() {
  return (
    <>
      <Header />

      <main className="">
        {/* carrusel */}
        <CarruselReact />

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
      <Footer />
    </>
  );
}
