import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Vite 6+ requires manualChunks as a function, not an object
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'
            }
            if (id.includes('framer-motion')) {
              return 'motion'
            }
            if (id.includes('react-icons')) {
              return 'icons'
            }
            if (id.includes('@emailjs')) {
              return 'emailjs'
            }
          }
        },
      },
    },
  },
})