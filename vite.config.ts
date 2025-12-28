import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default () => {
  process.env = { ...process.env, ...loadEnv('all', process.cwd()) };
  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      'global': {},
      'process.env': process.env,
    },
    server: {
      open: true,
      port: 3001,
    },
    preview: {
      port: 3000,
    },
  })
}