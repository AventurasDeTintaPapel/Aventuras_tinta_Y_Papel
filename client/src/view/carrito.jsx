import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import "@fontsource/baloo-2/700.css";

export function Carrito() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[65%_35%]">
        <Header />
        <main className="row-start-3 col-start-1 h-[100vh]"></main>
        <Footer />
      </div>
    </>
  );
}
