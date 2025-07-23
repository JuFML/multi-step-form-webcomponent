import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production') // ✅ Corrige o erro no navegador
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'CustomReactForm',
      formats: ['iife'],
      fileName: () => `custom-form.bundle.js`
    }
  }
})