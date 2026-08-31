import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { createRequire } from 'module';

// react/react-dom are installed per-workspace under pnpm and are not hoisted to
// the repo root, so Vite (running from the root vitest config) cannot resolve
// react's JSX runtime for .tsx tests. Resolve the concrete install from the web
// app, where react is a direct dependency, and alias to it.
const requireFromWeb = createRequire(resolve(__dirname, './apps/web/package.json'));
const reactDir = dirname(requireFromWeb.resolve('react/package.json'));
const reactDomDir = dirname(requireFromWeb.resolve('react-dom/package.json'));

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
      react: reactDir,
      'react-dom': reactDomDir,
    },
    dedupe: ['react', 'react-dom'],
  },
});
