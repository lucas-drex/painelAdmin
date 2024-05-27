import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'C:/Black Exclusive 6.0 - Atualizada 16.05/server/resources/[apex]/apex_admin/web',
  },
});
