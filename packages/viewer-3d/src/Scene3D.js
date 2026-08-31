'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
export function Scene3D({ rotation = true, scale = 1, position = [0, 0, 0] }) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    if (meshRef.current && rotation) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  return _jsxs('mesh', {
    ref: meshRef,
    position: position,
    scale: scale,
    castShadow: true,
    receiveShadow: true,
    children: [
      _jsx('boxGeometry', { args: [1, 1, 1] }),
      _jsx('meshStandardMaterial', { color: '#2563EB', metalness: 0.3, roughness: 0.4 }),
    ],
  });
}
