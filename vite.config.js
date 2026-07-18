import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',          // '/' because we're using a custom domain
  build: {
    outDir: 'dist',
  },
})

