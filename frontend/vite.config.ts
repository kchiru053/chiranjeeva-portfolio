import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': 'http://localhost:8080' } }, // `npm run dev` + Spring Boot on :8080
  build: {
    // The Spring Boot app serves the built site from its classpath.
    outDir: '../backend/src/main/resources/static',
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom'] },
      },
    },
  },
});
