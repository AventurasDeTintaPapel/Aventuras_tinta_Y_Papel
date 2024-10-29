import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "@fontsource/baloo-2/700.css";
import "@fontsource/bree-serif";

import { botonVolver, renderAside } from "../components/AsideCatalogo";
import { CorazonFav } from "../components/Fav";

export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const location = useLocation();

  // fetch para trear libros y sus filtros
  const fetchProductos = async (tipo, category = null) => {
    setProductos([]);
    setIsFiltered(!!category);
    try {
      const url = category
        ? `http://localhost:3400/api/filters?query=${tipo}&categoria=${category}`
        : `http://localhost:3400/api/filters?query=${tipo}`;
      const response = await axios.get(url);
      setProductos(response.data); // Actualizar con los productos nuevos
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // trae todos los libros
  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get("query");
    if (tipo) {
      fetchProductos(tipo);
    }
  }, [location]);

  // retorna el ASIDE Y MAIN
  return (
    <div className="grid grid-cols-[17%_1fr] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />

      <aside className="col-start-1 row-start-3 mb-[2vw]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="bg-white">
          <div className="flex flex-col w-full shadow-asideProductos rounded-br-[1vw] gap-[0.5vw] justify-center items-center pb-[1vw] ">
            <p className="bg-[#f8f5fa] text-[#4a395a] pl-[1vw] w-full py-[0.4vw] font-breeSerif text-[2vw]">Filtros:</p>
            {renderAside(fetchProductos)}
            {botonVolver(isFiltered)}
          </div>
        </div>
      </aside>

      <main style={{ fontFamily: "'Baloo 2', system-ui" }} className="col-start-2 row-start-3 flex flex-col">
        <div>
          {/* contenedor de tarjetas */}
          <div className="flex flex-wrap py-[2vw] justify-center items-center gap-[2.5vw] ">
            {productos.map((producto) => (
              // tarjeta
              <div
                key={producto._id}
                className="w-[16vw] relative h-[30vw] flex flex-col rounded-lg gap-[1vw] border-[0.1vw] shadow-lg shadow-purple-300 "
              >
                {/* imagen */}
                <div className="w-auto h-[22vw] relative">
                  <img className="w-full h-full rounded-t-lg object-cover" src={producto.imagen} alt={producto.titulo} />
                  <MasInfo
                    id={producto._id}
                    text={"Mas informacion"}
                    estilos={
                      " absolute bottom-[0.5vw] font-breeSerif left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-white hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] hover:translate-y-[0.05vw] transition-all ease-in-out duration-300"
                    }
                  />
                </div>
                {/* titulo y precio */}
                <div className="pl-[1vw] relative">
                  <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
                  <CorazonFav key={producto._id} producto={producto} estilo={"text-[#5a189a] absolute right-[1vw] top-[0.4vw] text-[1.5vw]"} />

                  <p className="text-[1.6vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
                </div>
                {/* boton */}
                <button className="bg-[#7c23c9] absolute bottom-0 w-full rounded-b-md text-slate-100 hover:text-white transition-all ease-in-out duration-300  hover:bg-[#6017a4] h-[2.3vw] text-[1.3vw] hover:text-[1.4vw]">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}

export function MasInfo({ id, estilos, text }) {
  const verDetalles = () => {
    window.location.href = `/detalles/${id}`;
  };

  return (
    <button onClick={verDetalles} className={estilos}>
      {text}
    </button>
  );
}
