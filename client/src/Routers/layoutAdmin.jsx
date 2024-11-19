import React from "react";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { NavAdmin } from "../components/NavAdmin";
import { HeaderAdmin } from "../components/HeaderAdmin";

export default function LayoutAdmin() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <HeaderAdmin colAndrow={"row-start-1"} />
      <NavAdmin colAndrow={"row-start-2"} />
      <div className="row-start-3 ">
        <Outlet />
      </div>
      <div className="row-start-4 bg-[#3b096b] h-[3vw]"></div>
    </div>
  );
}
