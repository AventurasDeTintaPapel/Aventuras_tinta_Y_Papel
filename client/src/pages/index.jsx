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
export const ProductForm = lazy(() => import("./productForm"));
export const ProductList = lazy(() => import("./productList"));
