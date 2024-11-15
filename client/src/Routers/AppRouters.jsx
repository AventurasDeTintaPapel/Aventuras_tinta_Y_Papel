import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/boogaloo";
import "@fontsource/poppins/700.css";
import "@fontsource/bree-serif";
import "@fontsource/baloo-2/700.css";
import { Suspense } from "react";
import { PrivateRoutes } from "../components/PrivateRoutes";
import Layout from "./layout";
import {
  AdminPanel,
  Carrito,
  Catalogo,
  Contactos,
  DetallesProductos,
  FormPublic,
  Inicio,
  Login,
  MisFavoritos,
  Perfil,
  ProductList,
  Registro,
  SupportChat,
} from "../pages";
// importacion para que ande paypal
import PayPalPayment from "../components/PaypalComponent.JSX";

const AppRouter = () => {
  return (
    <Suspense fallback={<p>Cargando página ...</p>}>
      <BrowserRouter>
        <Routes>
          {/* Rutas que usan el Layout */}
          <Route element={<Layout />}>
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/soporte" element={<SupportChat />} />
            <Route path="/detalles/:id" element={<DetallesProductos />} />
            <Route path="/listado" element={<ProductList />} />
            {/* Rutas admin */}
            
              <Route path="/adminPanel" element={<AdminPanel />} />
            
          </Route>

          {/* rutas con aside*/}
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/favoritos" element={<MisFavoritos />} />
          <Route path="/intercambiar" element={<FormPublic />} />

          {/* Ruta para paypal */}
          <Route path="/carrito" element={<Carrito />}>
            <Route path="/carrito" element={<PayPalPayment />} />
          </Route>

          {/* Rutas sin header,nav o footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
