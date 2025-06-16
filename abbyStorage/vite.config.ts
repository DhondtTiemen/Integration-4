// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// stel de juiste base in voor GitHub Pages
export default defineConfig({
  base: '/Integration-4/',
  plugins: [vue(), tailwindcss()]
})