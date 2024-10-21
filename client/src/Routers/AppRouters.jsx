import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contactos } from "../view/Contactos";
import { Inicio } from "../view/inicio";
import { Catalogo } from "../view/catalogo";
import { Login } from "../view/login";
import { Registro } from "../view/registro";
import { Perfil } from "../view/perfil";
import Chat from "../view/chatbot";
import { Carrito } from "../view/carrito";
import { DetallesProductos } from "../view/detallesProductos";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/soporte" element={<Chat />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/detalles/:id" element={<DetallesProductos />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
