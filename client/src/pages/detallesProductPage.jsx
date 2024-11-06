import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CorazonFav } from "../components/Fav";
import { BotonComprar } from "../components/objetosVariasdos";

export default function DetallesProductos() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const respose = await axios.get(`http://localhost:3400/api/productos/${id}`);
        setProducto(respose.data);
      } catch (error) {
        console.error("Error a obetener el producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) return <p>Cargando unu</p>;

  return (
    <main className="row-start-3">
      {/* contenedor general */}
      <div className="bg-white w-full px-[5vw] h-full grid grid-rows-[auto_auto_auto]">
        {/*contenedor de imagen y botones */}
        <div className="row-start-1 p-[1vw] flex shadow-xl ">
          {/* contenedor imagen */}
          <div className="w-[20vw]">
            <img className="w-full h-full object-cover" src={producto.imagen} alt="" />
          </div>

          {/* titulo e info */}
          <div className="w-full relative h-full pl-[1vw]">
            <CorazonFav producto={producto} key={producto._id} estilo={"absolute right-[3vw] text-[2.5vw] top-[1.5vw]"} />

            {/* titulo */}
            <div className=" border-b border-slate-500">
              <div className="text-slate-900 w-[80%] pb-[0.5vw] pt-[1vw]">
                <p className="text-[3vw] truncate font-poopins">{producto.titulo}</p>
              </div>
            </div>
            {/* tipo */}
            <p className=" font-baloo text-slate-700 text-[1.5vw] list-item ml-[1.5vw] pt-[1vw]">
              <span className="font-poopins text-slate-800">Tipo: </span>
              {producto.tipo}
            </p>
            {/* autor */}
            <p className=" font-baloo text-slate-700 text-[1.5vw] list-item ml-[1.5vw]">
              <span className="font-poopins text-slate-800">Autor: </span> {producto.autor}
            </p>
            {/* precio */}
            <p className=" font-baloo text-slate-700 text-[1.5vw] list-item ml-[1.5vw]">
              <span className="font-poopins text-slate-800">Precio: </span>${producto.precio}
            </p>
            <div className="absolute bottom-[0.5vw] font-breeSerif rounded-[0.5vw] bg-[#250642] px-[2vw] py-[0.4vw]">
              <BotonComprar producto={producto} estilos={"text-[1.5vw] font-medium tracking-wide text-white"} />
              <Volver />
            </div>
          </div>

          {/* contenerdor Descripcion */}
        </div>

        {/* descripcion */}
        <div className=" pl-[2vw] bg-[#f7f1fa] row-start-2 py-[1vw]">
          <p className="text-[1.9vw] text-[#361158]" style={{ fontFamily: "'Poppins', sans-serif" }}>
            De que trata este {producto.tipo}:
          </p>
          <p className="w-[95%] text-[#4c197b]  pl-[1vw] pt-[0.5vw] text-[1.3vw]"> {producto.descripcion} </p>
        </div>

        {/* comentarios */}
        <div className=" rounded-b-[1vw] space-y-[1vw] pt-[1vw] bg-[#efe3f6]  row-start-3">
          <div className="flex pl-[1vw] gap-[0.5vw]">
            <FaStar className="text-[2.5vw]" />
            <FaStar className="text-[2.5vw]" />
            <FaStar className="text-[2.5vw]" />
            <FaRegStar className="text-[2.5vw]" />
            <FaRegStar className="text-[2.5vw]" />
          </div>
          <Comentarios />
        </div>
      </div>
    </main>
  );
}

// comentarios
function Comentarios() {
  const [comentarios, setComentarios] = useState(false);
  const [estilos, setEstilos] = useState({});
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // accion del clic
  const manejarClic = () => {
    setComentarios(!comentarios);
    setEstilos(comentarios ? { transition: "transform 0.5s ease" } : { transform: "rotate(-180deg)", transition: "transform 0.5s ease" });
  };

  return (
    <>
      <button onClick={manejarClic} className="text-[#361158] flex items-center gap-[0.3vw] pl-[1.3vw]">
        <span className="text-[1.5vw]">Comentarios</span>
        <IoIosArrowDown style={estilos} className="text-[1.8vw]" />
      </button>
      <div
        className={` ${
          comentarios ? " max-h-[30vw] opacity-100 " : "opacity-0 pointer-events-none max-h-0 "
        } transition-all ease-in-out duration-500 overflow-hidden`}
      >
        <div className="w-full h-[30vw] grid grid-rows-[1fr_auto]">
          {/* inpur comnetario */}
          <div className=" bg-[#efe3f6] rounded-b-[1vw] w-full row-start-2 flex items-center gap-[1.5vw] relative ">
            <div className="w-full h-[5vw] grid grid-cols-[80%_20%] bg-red-400">
              <div className="flex justify-center items-center">
                <textarea
                  placeholder="Escriba un comentario"
                  className="w-[95%] rounded-[1vw] pl-[1vw] pt-[0.8vw] text-[1.8vw] h-[4vw] tracking-wide"
                ></textarea>
              </div>
              <button>Enviar</button>
            </div>
          </div>
          <div className="bg-white overflow-y-auto"></div>
        </div>
      </div>
    </>
  );
}

// boton volver
function Volver() {
  const navigate = useNavigate();

  const hancleRedirect = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={hancleRedirect}
      className="flex items-center gap-[0.5vw] absolute px-[1.5vw] rounded-[0.5vw] border-[0.2vw] border-[#250642]  text-[#250642] left-[12vw] py-[0.5vw] text-[1.5vw]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1.5vw] mb-[0.3vw] group-hover:w-[1.8vw] transition-all ease-in-out duration-300"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10 2a1 1 0 0 0-1.79-.614l-7 9a1 1 0 0 0 0 1.228l7 9A1 1 0 0 0 10 20v-3.99c5.379.112 7.963 1.133 9.261 2.243c1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 0 0 1.981-.122c.171-2.748-.086-6.73-2.027-10.061C19.087 8.768 15.695 6.282 10 6.022z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="group-hover:text-[1.6vw] transition-all ease-in-out duration-300">Volver </span>
    </button>
  );
}
