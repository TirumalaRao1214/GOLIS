import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Render injects PORT — bind to 0.0.0.0 so it's externally accessible
    port: parseInt(process.env.PORT || '4173'),
    host: '0.0.0.0',
    allowedHosts: ['all'],
  },
  build: {
    outDir: 'dist',
  },
})
