import React from "react";
import "@fontsource/bree-serif";

import { botonVolver, renderAside } from "../components/AsideCatalogo";
import { CorazonFav } from "../components/Fav";
import { useFetchProductos } from "../hook/useFetchProductos";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BotonComprar } from "../components/objetosVariasdos";
import { useAlert } from "../hook/useAlert";

export default function Catalogo() {
  const { Product, isFiltered, fetchProductos } = useFetchProductos();

  // retorna el ASIDE Y MAIN
  return (
    <div className="grid grid-cols-[20%_80%] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />
      <aside className=" col-start-1 row-start-3 w-[20vw] mb-[2vw]">
        <div className="flex flex-col w-full shadow-asideProductos rounded-br-[1vw] gap-[0.5vw] justify-center items-center pb-[1vw]">
          <p className="bg-[#f8f5fa] text-[#4a395a] pl-[1vw] w-full py-[0.4vw] font-breeSerif text-[2vw]">Filtros:</p>
          {renderAside(fetchProductos)}
          {botonVolver(isFiltered)}
        </div>
      </aside>

      <main className="col-start-2 row-start-3 flex flex-col">
        <div>
          {/* contenedor de tarjetas */}
          <div className="grid grid-cols-4 px-[3vw] justify-items-center py-[2vw] gap-[2vw] ">
            {Product.map((producto) => (
              // tarjeta
              <div
                key={producto._id}
                className="w-[16vw] relative h-[30vw] flex flex-col rounded-[0.5vw] shadow-lg hover:outline hover:outline-offset-[0.3vw] outline-purple-800 hover:border-[0.3vw] border-purple-800 group transition-all ease-in-out duration-150"
              >
                {/* imagen */}
                <div className="w-auto h-[22vw] relative">
                  <img
                    className="w-full h-full rounded-t-lg group-hover:rounded-t-[0.2vw] transition-all ease-in-out duration-150 object-cover"
                    src={producto.imagen}
                    alt={producto.titulo}
                  />
                  <MasInfo
                    id={producto._id}
                    text={"Mas informacion"}
                    estilos={
                      " absolute bottom-[0.5vw] font-breeSerif left-[0.5vw] bg-[#8321d8] bg-opacity-85 text-white hover:text-white text-[0.8vw] rounded-md px-[0.4vw] py-[0.2vw] hover:bg-opacity-100 hover:text-[0.85vw] hover:translate-y-[0.05vw] transition-all ease-in-out duration-300"
                    }
                  />
                </div>
                {/* titulo y precio */}
                <div className=" h-full relative pt-[0.5vw] pl-[1vw]">
                  <div className="truncate w-[10vw] text-[#7950a2] text-[1.3vw]">{producto.titulo}</div>
                  <CorazonFav key={producto._id} producto={producto} estilo={"text-[#5a189a] absolute right-[1vw] top-[0.8vw] text-[1.5vw]"} />

                  <p className="text-[1.6vw] text-[#4d2b6c]">Precio: ${producto.precio}</p>
                </div>

                {/* boton */}
                <BotonComprar
                  producto={producto}
                  estilos={
                    "bg-[#7c23c9] absolute bottom-0 w-full rounded-b-lg group-hover:rounded-b-[0.2vw] transition-all ease-in-out duration-150 text-slate-100 hover:text-white hover:bg-[#6017a4] h-[2.3vw] text-[1.3vw] hover:text-[1.4vw]"
                  }
                />
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
