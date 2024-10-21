import axios from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import "@fontsource/baloo-2/700.css";
import "@fontsource/poppins/700.css";
import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
const { TextArea } = Input;

export function DetallesProductos() {
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
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3 py-[3vw]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="bg-white w-full h-full flex justify-center items-center">
          <div className="grid grid-rows-[auto_auto_auto] shadow-detelles rounded-[1vw] w-[70vw]">
            <div className=" row-start-1 p-[2vw] flex gap-[2vw] ">
              {/* contenedor imagen */}
              <div className="w-[17vw] h-[25vw] p-[1vw] rounded-[0.5vw] bg-[#3C096C]">
                <img className="w-full h-full" src={producto.imagen} alt="" />
              </div>

              {/* contenedor info y botones */}
              <div className="space-y-[1vw] flex flex-col justify-between py-[0.2vw]">
                {/* titulo e info */}

                <div className="space-y-[0.8vw]">
                  <p className="text-[2.8vw] text-[#361158]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {producto.titulo}
                  </p>
                  <p className="text-[1.5vw] pl-[0.8vw]  text-[#62269a]">
                    <span className="text-[#361158] text-[1.6vw]">Tipo:</span> {producto.tipo}
                  </p>
                  <p className="text-[1.5vw] pl-[0.8vw] text-[#62269a]">
                    <span className="text-[#361158] text-[1.6vw]">Autor:</span> {producto.autor}
                  </p>
                  <p className="text-[1.5vw] pl-[0.8vw] text-[#62269a]">
                    <span className="text-[#361158] text-[1.6vw]">Precio:</span> ${producto.precio}
                  </p>
                </div>
                {/* botones */}
                <div className="flex gap-[2vw] h-[5vw] items-center">
                  <BotonComprar />
                  <VolverCatalogo />
                </div>
              </div>

              {/* contenerdor Descripcion */}
            </div>
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
        </div>
      </main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}

function VolverCatalogo() {
  const navigate = useNavigate();

  const hancleRedirect = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={hancleRedirect}
      className="flex border-[#5A189A] text-[#3f1569] border-[0.2vw] px-[1.5vw] justify-center h-[4vw] items-center gap-[1vw] rounded-[0.4vw] group hover:translate-x-[-0.5vw] transition-all ease-in-out duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1.7vw] mb-[0.3vw] group-hover:w-[1.8vw] transition-all ease-in-out duration-300"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10 2a1 1 0 0 0-1.79-.614l-7 9a1 1 0 0 0 0 1.228l7 9A1 1 0 0 0 10 20v-3.99c5.379.112 7.963 1.133 9.261 2.243c1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 0 0 1.981-.122c.171-2.748-.086-6.73-2.027-10.061C19.087 8.768 15.695 6.282 10 6.022z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-[1.5vw] group-hover:text-[1.6vw] transition-all ease-in-out duration-300">Volver a Catalogo</span>
    </button>
  );
}

function Comentarios() {
  const [comentarios, setComentarios] = useState(false);
  const [estilos, setEstilos] = useState({});

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
          <div className=" bg-[#efe3f6] rounded-b-[1vw] w-full row-start-2 flex items-center pl-[2vw] gap-[1.5vw] relative py-[1.5vw]">
            <AutoGrowingTextarea />
            <button
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="shadow-2xl right-[3vw] absolute bg-white h-[3vw] text-[1.2vw] text-[#4c1363] hover:text-[1.5vw]  hover:h-[3.2vw] hover:translate-x-[0.5vw] transition-all ease-in-out duration-300 rounded-full px-[2vw]"
            >
              Enviar
            </button>
          </div>
          <div className="bg-white overflow-y-auto"></div>
        </div>
      </div>
    </>
  );
}

const AutoGrowingTextarea = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // Función para ajustar la altura automáticamente
  const ajustarAltura = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Resetea la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta según el contenido
  };

  useEffect(() => {
    ajustarAltura();
  }, [text]);

  return (
    <div className="w-[80%]">
      <textarea
        ref={textareaRef}
        className="w-full mt-[0.4vw] px-[1vw] py-[0.5vw] text-[1.4vw] border border-gray-300 resize-none rounded-[1vw] overflow-hidden"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="1"
        placeholder="Añadir comentario"
        style={{ minHeight: "3rem", height: "auto" }}
      />
    </div>
  );
};

function BotonComprar() {
  return (
    <button
      href="#"
      className="flex bg-[#5A189A] text-white px-[1.5vw] justify-center h-[4vw] items-center gap-[1vw] rounded-[0.4vw] text-[1.5vw] hover:text-[1.7vw] group 
transition-all ease-in-out duration-300"
    >
      Comprar
    </button>
  );
}
