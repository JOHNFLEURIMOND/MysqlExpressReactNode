import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    external: [
      '@emotion/react', // Add @emotion/react to the external list if you don't want to include it in the bundle
    ],
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor code
        },
        globals: {
          '@emotion/react': 'EmotionReact',
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
