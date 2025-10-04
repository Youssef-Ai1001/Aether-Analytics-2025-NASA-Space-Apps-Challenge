import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/send-otp': {
        target: 'https://07d8adfbe3e1.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      },
      '/verify-otp': {
        target: 'https://07d8adfbe3e1.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
