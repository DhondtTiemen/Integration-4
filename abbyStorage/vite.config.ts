// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// stel de juiste base in voor GitHub Pages
export default defineConfig({
  plugins: [vue()],
  base: '/Integration-4/' // vervang dit met je repo-naam
})