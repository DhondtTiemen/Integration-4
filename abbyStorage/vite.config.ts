// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// stel de juiste base in voor GitHub Pages
export default defineConfig({
  base: '/Integration-4/',
  plugins: [vue(), tailwindcss(), compression()]
})