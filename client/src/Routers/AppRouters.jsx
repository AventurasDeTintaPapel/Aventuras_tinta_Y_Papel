import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contactos } from "../view/Contactos";
import { Inicio } from "../view/inicio";
import { Catalogo } from "../view/catalogo";
import { Login } from "../view/login";
import { Registro } from "../view/registro";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/inicio" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
