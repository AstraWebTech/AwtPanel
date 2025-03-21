import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../public',
    assetsDir: 'assets',
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
