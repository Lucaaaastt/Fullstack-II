import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tienda-jdr-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
})