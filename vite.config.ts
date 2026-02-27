import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// For GitHub Pages: repo name as base when deployed at username.github.io/diet-app/
export default defineConfig({
  base: process.env.CI === 'true' ? '/diet-app/' : '/',
  plugins: [react(), tailwindcss()],
})
