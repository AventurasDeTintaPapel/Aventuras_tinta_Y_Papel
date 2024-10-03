import React, { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Carruseltarjetas } from "../components/tarrjeta";

import imgCarrusel1 from '../assets/img/imgCarrusel1.png';
import imgCarrusel2 from '../assets/img/imgCarrusel2.png';
import imgCarrusel3 from '../assets/img/imgCarrusel3.png';


function Separador({ texto }) {
  return <p className="text-purple-950 text-[2.5vw] font-semibold text-center bg-purple-100 w-[101%]">{texto}:</p>;
}

function ImagenCarrusel({ imagen, numberImg, isVisible }) {
  return (
    <div className={`sliderSection w-[calc(100%/3)] ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-in-out flex justify-center`}>
      <img className="w-[75%] h-full" src={imagen} alt={numberImg} />
    </div>
  );
}


function Carrusel() {
  const carruselRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [sliderSections, setSliderSections] = useState([]);
  const imgWidth = 100 / sliderSections.length;

  useEffect(() => {
    // Obtener las secciones del slider una vez que se haya renderizado el componente
    setSliderSections(document.querySelectorAll(".sliderSection"));
  }, []);

  const moveToRight = () => {
    setCounter((prev) => {
      const newCounter = (prev + 1) % sliderSections.length;
      updateCarouselPosition(newCounter);
      return newCounter;
    });
  };

  const moveToLeft = () => {
    setCounter((prev) => {
      const newCounter = (prev - 1 + sliderSections.length) % sliderSections.length;
      updateCarouselPosition(newCounter);
      return newCounter;
    });
  };

  const updateCarouselPosition = (newCounter) => {
    const operacion = newCounter * imgWidth;
    if (carruselRef.current) {
      carruselRef.current.style.transform = `translate(-${operacion}%)`;
      carruselRef.current.style.transition = "transform 1.2s ease";
    }
  };

  useEffect(() => {
    if (sliderSections.length > 0) {
      // Establecer el intervalo para la transición automática solo si hay imágenes
      const interval = setInterval(moveToRight, 3000);

      return () => clearInterval(interval);
    }
  }, [sliderSections, imgWidth]);

  return (
    <div className="contenedorCarrusel relative overflow-hidden my-[1vw] ">
      <div className="carruseles w-[300%] h-[30vw] flex ml-[0.5vw]" id="carruseles" ref={carruselRef}>
        
        <ImagenCarrusel imagen={imgCarrusel1} numberImg={"img1"} isVisible={counter === 0} />
        <ImagenCarrusel imagen={imgCarrusel2} numberImg={"img2"} isVisible={counter === 1} />
        <ImagenCarrusel imagen={imgCarrusel3} numberImg={"img3"} isVisible={counter === 2} />

      </div>

      {/* Botones de navegación */}
      <div className="btnleft" onClick={moveToLeft}>
        <svg className="fi-rs-angle-right absolute top-[13vw] left-[2.5vw]  w-[5vw] z-10  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M16.041,24,6.534,14.48a3.507,3.507,0,0,1,0-4.948L16.052,0,18.17,2.121,8.652,11.652a.5.5,0,0,0,0,.707l9.506,9.52Z"
            className="fill-[#34074b]"
          />
        </svg>
      </div>
  
      <div className="btnRight" onClick={moveToRight}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fi-rs-angle-right absolute top-[13vw] right-[2.5vw] w-[5vw] z-10">
          <path
            d="M8.534,24l9.507-9.52a3.507,3.507,0,0,0,0-4.948L8.525,0,6.407,2.121,15.927,11.652a.5.5,0,0,1,0,.707L6.421,21.172Z"
             className="fill-[#34074b]"
          />
        </svg>
      </div>
    </div>
  );
}


export function Inicio() {
  return (
    <>
      <Header />
      <Nav />

      <main className="col-start-2 row-start-2 flex flex-col items-center /*marrgin y paddings*/ pb-[2vw] /*espaciado*/ xlprimario:gap-[1vw] xlsecundario:gap-[1.5vw]">
        {/* carrusel */}
        <Carrusel />

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
      </main>
      <Footer />
    </>
  );
}
