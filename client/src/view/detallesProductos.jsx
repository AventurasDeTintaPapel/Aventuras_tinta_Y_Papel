import axios from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import "@fontsource/baloo-2/700.css";
import "@fontsource/poppins/700.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
      <Nav colAndrow={" row-start-2"} />
      <main className="col-start-1 row-start-3 py-[3vw]" style={{ fontFamily: "'Baloo 2', system-ui" }}>
        <div className="bg-white w-full h-full flex justify-center items-center">
          <div className="grid grid-rows-[auto_auto_auto] shadow-detelles rounded-[1vw] w-[70vw]">
            <div className=" row-start-1 p-[2vw] flex gap-[2vw] ">
              {/* contenedor imagen */}
              <div className="w-[16.5vw] h-[25vw] p-[1vw] rounded-[0.5vw] bg-[#3C096C]">
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
                  <button
                    href="#"
                    className="flex bg-[#5A189A] text-white px-[1.5vw] justify-center h-[4vw] items-center gap-[1vw] rounded-[0.4vw] text-[1.5vw] hover:text-[1.7vw] group 
                  transition-all ease-in-out duration-300"
                  >
                    Comprar
                  </button>
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
            <div className=" pl-[4vw] rounded-b-[1vw] space-y-[1vw] py-[1vw] bg-[#efe1f7]  row-start-3">
              <div className="flex gap-[0.5vw]">
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

  const manejarClic = () => {
    setComentarios(!comentarios);
  };

  return (
    <>
      <button onClick={manejarClic} className="flex items-center gap-[0.3vw]">
        <span className="text-[1.5vw]">Comentarios</span>
        <IoIosArrowDown className="text-[1.8vw]" />
      </button>
      <div className={` ${comentarios ? " block" : " hidden "} transition-all ease-in-out duration-700`}>
        <p>hola mundo</p>
        <p>hola mundo</p>
        <p>hola mundo</p>
        <p>hola mundo</p>
      </div>
    </>
  );
}
