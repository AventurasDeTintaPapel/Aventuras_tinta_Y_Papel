import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/boogaloo";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/bree-serif";
import "@fontsource/baloo-2/700.css";
import { Suspense } from "react";
import { PrivateRoutes } from "../components/PrivateRoutes";
import Layout from "./layout";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { SessionProvider } from "../context/SessionProvider";
import {
  AdminInicio,
  AdminPanel,
  AdminPedidos,
  AdminProveedores,
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
import LayoutAdmin from "./layoutAdmin";

const AppRouter = () => {
  return (
    <SessionProvider>
    <Suspense fallback={<p>Cargando página ...</p>}>
      <BrowserRouter>
        <Routes>
          {/* Rutas sin aside */}
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/soporte" element={<SupportChat />} />
            <Route path="/detalles/:id" element={<DetallesProductos />} />
          </Route>

          {/* rutas para admin */}
        
          <Route element={<LayoutAdmin />}>
          
            <Route path="/inicioAdmin" element={<AdminInicio />} />
            <Route path="/adminPanel" element={<PrivateRoutes><AdminPanel /></PrivateRoutes >} />
            <Route path="/adminProveedores" element={<AdminProveedores />} />
            <Route path="/adminPedidos" element={<AdminPedidos />} />

          </Route>

          {/* prueba de header */}
          <Route path="/contactos" element={<Contactos />} />

          {/* rutas con aside*/}
          <Route path="/listado" element={<ProductList />} />
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
    </SessionProvider>
  );
};

export default AppRouter;
