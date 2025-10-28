import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
  proxy: {
    '/shows': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // Use false para HTTP
      },
    '/api': 'http://localhost:3000',
  },
},
  plugins: [
    react(),
    tailwindcss(),
  ],
})


