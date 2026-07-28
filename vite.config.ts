import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 404.html and the per-route HTML files are written by scripts/prerender.mjs,
// which runs after both the client and SSR builds.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
