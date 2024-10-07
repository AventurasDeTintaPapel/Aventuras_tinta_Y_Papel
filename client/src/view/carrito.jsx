import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { LuTrash2 } from "react-icons/lu";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

import { Divider } from "antd";

import "@fontsource/baloo-2/700.css";

export function Carrito() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[65%_35%]">
        <Header />
        <Nav />
        <main className="row-start-3 col-start-1 flex gap-[1vw] flex-col justify-center items-center bg-white py-[1vw] px-[2vw]">
          {/* tarjeta */}
          <TarjetaCarrito />
          <TarjetaCarrito />
          <TarjetaCarrito />
        </main>
        <aside className="row-start-3 col-start-2 bg-blue-400"></aside>
        <Footer />
      </div>
    </>
  );
}

function TarjetaCarrito() {
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-red-500 grid grid-cols-2 grid-rows-2">
      <div className="col-start-1 row-start-1 "></div>
      <div className="col-start-2 row-start-1"></div>
      <div className="col-span-2 row-start-2"></div>
    </div>
  );
}

{
  /* <div className="space-y-2">
  <div className="flex items-center space-x-2">
    <label className="text-sm font-medium">Cantidad:</label>
    <div className="flex items-center">
      <button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementQuantity}>
        <FaMinus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
        className="h-8 w-12 rounded-none border-y text-center text-sm"
      />
      <button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
        <FaPlus className="h-4 w-4" />
      </button>
    </div>
  </div>
  <p className="text-sm text-gray-500">
    Productos disponibles: <span className="font-medium">20</span>
  </p>
</div>; */
}
