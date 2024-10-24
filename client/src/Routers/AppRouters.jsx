//appRouters.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contactos } from "../view/Contactos";
import { Inicio } from "../view/inicio";
import { Catalogo } from "../view/catalogo";
import { Login } from "../view/login";
import { Registro } from "../view/registro";
import Chat from "../view/chatbot";
import ProductForm from "../components/productForm";
import ProductList from "../components/productList";
import ProductItem from "../components/ProductItem";
import EditProduct from "../components/productEdit";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/inicio" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/soporte" element={<Chat/>}/>
        <Route path="/vender" element={<ProductForm/>}/>
        <Route path="/item" element={<ProductItem/>}/>
        <Route path="/list" element={<ProductList/>}/>
        <Route path="/edit" element={<EditProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
