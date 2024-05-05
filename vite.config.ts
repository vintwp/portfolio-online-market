import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const isLintEnabled = true;

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    isLintEnabled
      ? checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            dev: {
              logLevel: ['error', 'warning'],
            },
          },
        })
      : undefined,
  ],
  server: {
    open: true,
    port: 3000,
  },
  base: '/portfolio-online-market/',
});
