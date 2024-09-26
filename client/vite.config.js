import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        contacto: './html/contacto.html',
        inicioCambiado:"./html/inicio/inicioCambiado.html"
        // se puede poner mas aqui,
      }
    }
  }
});



