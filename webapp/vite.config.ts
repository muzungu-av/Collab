import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'feat-opt-wet-jay.trycloudflare.com' // разрешаем этот домен
    ]
  }
})
