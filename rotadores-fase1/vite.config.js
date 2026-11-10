import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' -> rutas relativas, necesario para que el build empaquetado
// funcione dentro del WebView de Capacitor (no hay servidor real sirviendo /assets).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
