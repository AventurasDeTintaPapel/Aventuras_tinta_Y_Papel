import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import React, { useState } from "react";

export function Favoritos() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"row-start-1"} />
      <Nav colAndrow={"row-start-2"} />
      <main className="row-start-3"></main>
      <Footer colAndrow={"row-start-4"} />
    </div>
  );
}
