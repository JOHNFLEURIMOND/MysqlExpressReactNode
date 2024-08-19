// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx', // Treat .js files as JSX
      '.jsx': 'jsx', // Treat .jsx files as JSX
    },
  },
  optimizeDeps: {
    include: ['some-large-dependency'], // Add any large dependencies if needed
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor code
        },
      },
    },
  },
  server: {
    port: 3000, // Default Vite server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Adjust to your Express server port
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
