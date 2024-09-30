import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        contacto: "./html/contacto.html",
        inicioCambiado: "./html/inicio/inicioCambiado.html",
        libro: "./html/productos/ProductosLibros.html",
        Comics: "./html/productos/ProductosComics.html",
        Mangas: "./html/productos/ProductosMangas.html",
        Merch: "./html/productos/ProductosMerch.html",
        // se puede poner mas aqui,
      },
    },
  },
});
