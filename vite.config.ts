import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/utilitrack/',  // Add this line for GitHub Pages
  plugins: [react()],
});
