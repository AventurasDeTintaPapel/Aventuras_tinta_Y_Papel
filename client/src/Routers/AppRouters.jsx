import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contactos } from "../view/Contactos";
import { Inicio } from "../view/inicio";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
