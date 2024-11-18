import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { NavAdmin } from "../components/NavAdmin";

export default function LayoutAdmin() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <NavAdmin colAndrow={"row-start-2"} />
      <div className="row-start-3 ">
        <Outlet />
      </div>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}
