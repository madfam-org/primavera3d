'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { LoadingSpinner } from './LoadingSpinner.js';
export function ModelViewer({
  children,
  className,
  showGrid = true,
  showControls = true,
  environment = 'studio',
}) {
  return _jsx('div', {
    className: className,
    style: { width: '100%', height: '100%' },
    children: _jsx(Suspense, {
      fallback: _jsx(LoadingSpinner, {}),
      children: _jsxs(Canvas, {
        camera: { position: [5, 5, 5], fov: 50 },
        shadows: true,
        dpr: [1, 2],
        children: [
          _jsx('ambientLight', { intensity: 0.5 }),
          _jsx('directionalLight', { position: [10, 10, 10], intensity: 1, castShadow: true }),
          showGrid &&
            _jsx(Grid, {
              args: [10, 10],
              cellColor: '#6B7280',
              sectionColor: '#374151',
              fadeDistance: 30,
              fadeStrength: 1,
              cellSize: 1,
              sectionSize: 3,
              followCamera: false,
              infiniteGrid: true,
            }),
          showControls && _jsx(OrbitControls, { enableDamping: true }),
          _jsx(Environment, { preset: environment }),
          children,
        ],
      }),
    }),
  });
}
