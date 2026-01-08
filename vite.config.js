import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
    },
    // ❗ Remove dev caching headers completely
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  optimizeDeps: {
    force: true,  // Always re-optimize deps after install/config changes
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@mui/icons-material', 'framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
