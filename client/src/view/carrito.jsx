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
        <main className="row-start-3 col-start-1 "></main>
        <aside className="row-start-3 col-start-2 bg-blue-400"></aside>
        <Footer />
      </div>
    </>
  );
}
