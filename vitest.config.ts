import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '*.config.ts',
        '**/*.d.ts',
        '.next/',
        '.turbo/',
        'dist/',
        'build/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './apps/web/app'),
      '@repo/ui': resolve(__dirname, './packages/ui/src'),
      '@repo/viewer-3d': resolve(__dirname, './packages/viewer-3d/src'),
      '@repo/utils': resolve(__dirname, './packages/utils/src'),
    },
  },
});
