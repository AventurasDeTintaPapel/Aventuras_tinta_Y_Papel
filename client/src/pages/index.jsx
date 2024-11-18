import { lazy } from "react";

export const Inicio = lazy(() => import("./inicioPage"));
export const Contactos = lazy(() => import("./contactosPage"));
export const Catalogo = lazy(() => import("./catalogoPage"));
export const MisFavoritos = lazy(() => import("./favoritosPage"));
export const Login = lazy(() => import("./loginPage"));
export const Registro = lazy(() => import("./registroPage"));
export const Perfil = lazy(() => import("./perfilPage"));
export const Carrito = lazy(() => import("./carritoPage"));
export const DetallesProductos = lazy(() => import("./detallesProductPage"));
// ramas naza
export const SupportChat = lazy(() => import("./chatbot"));
export const FormPublic = lazy(() => import("./formPublicPage"));
export const ProductList = lazy(() => import("./listProducts"));

// admin
export const AdminPanel = lazy(() => import("./AdminPanel"));

export const AdminInicio = lazy(() => import("./AdminInicio"));

export const AdminProveedores = lazy(() => import("./AdminProveedores"));
export const AdminPedidos = lazy(() => import("./AdminPedidos"));
