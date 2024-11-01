import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { useState } from "react";
import axios from "axios";

const GetProducCarr = async () => {
  const [getCarr, setGetCarr] = useState([]);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3400/api/pedidos/orderUser", {
      headers: { token },
    });
    setGetCarr(response.data);
  } catch (error) {
    console.error("Error al traer los produtos a carrito");
  }
};

export default function Carrito() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[75%_25%] h-screen">
        <Header colAndrow={"row-start-1 col-span-2"} />
        <Nav colAndrow={"row-start-2 col-span-2"} />
        <aside className="row-start-3 col-start-2">
          <div className="bg-red-500 w-full h-full p-[1vw]  font-boogaloo tracking-wider">
            <div className="flex bg-red-100 justify-around items-center rounded-t-[0.5vw]">
              <p className="text-[1.6vw]">Producto:</p>
              <p className="text-[1.6vw]">Precio</p>
            </div>
            <div className="bg-violet-300 marker:">
              <div className="justify-items-center pl-[0.3vw] grid grid-cols-2">
                {/* productos */}
                <div>
                  <ul className=" pl-[0.3vw] ">
                    <li className="text-[1.2vw]">Producto 1</li>
                    <li className="text-[1.2vw]">Producto 2</li>
                    <li className="text-[1.2vw]">Producto 3</li>
                    <li className="text-[1.2vw]">Producto 4</li>
                    <li className="text-[1.2vw]">Producto 5</li>
                  </ul>
                </div>
                {/* precio */}
                <div>
                  <ul className=" pl-[0.3vw] ">
                    <li className="text-[1.2vw]">$3000</li>
                    <li className="text-[1.2vw]">$3000</li>
                    <li className="text-[1.2vw]">$3000</li>
                    <li className="text-[1.2vw]">$3000</li>
                    <li className="text-[1.2vw]">$3000</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex bg-red-400 justify-around items-center rounded-b-[0.5vw]">
              <p className="text-[2.2vw]">Total:</p>
              <p className=" text-[1.7vw]">$8000</p>
            </div>
          </div>
        </aside>
        <main className="row-start-3 col-start-1">
          <div className="bg-blue-500 w-full h-full"></div>
        </main>
        <Footer colAndrow={"row-start-4 col-span-2"} />
      </div>
    </>
  );
}
