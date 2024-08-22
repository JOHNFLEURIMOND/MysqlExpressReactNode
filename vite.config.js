import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),],
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code (e.g., React and ReactDOM) into a separate chunk
          vendor: ['react', 'react-dom'],
        },
        globals: {
          // Define global variables for external dependencies if necessary
          '@emotion/react': 'EmotionReact',
        },
      },
      external: [
        // Exclude these dependencies from the final bundle
        '@emotion/react',
      ],
    },
  },
  server: {
    port: 3000, // Development server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend API server
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // Remove /api prefix when proxying
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Simplify imports from the src directory
    },
  },
  optimizeDeps: {
    include: ['@emotion/react'], // Ensure @emotion/react is optimized for faster builds
  },
});
