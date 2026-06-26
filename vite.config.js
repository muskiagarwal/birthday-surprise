import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the built site works on Vercel, Netlify,
  // and GitHub Pages (project subpaths) without extra config.
  base: './',
  server: {
    // Honor a harness/host-assigned port when present; fall back to Vite default.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
