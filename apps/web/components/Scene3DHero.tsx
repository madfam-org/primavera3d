'use client';

// React Three Fiber maps three.js properties (args, attach, position,
// intensity, ...) onto its intrinsic elements (mesh, ambientLight, fog, ...).
// eslint-plugin-react's generic `no-unknown-property` rule does not know about
// R3F's element namespace and flags these valid props as unknown, so it is
// disabled for this R3F-only file.
/* eslint-disable react/no-unknown-property */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
// import * as THREE from 'three'; // Used for type references

function HeroMesh() {
  const meshRef = useRef<Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <octahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#2563EB"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3DHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#2563EB" />
        <HeroMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <fog attach="fog" args={['#0A0E27', 5, 15]} />
      </Canvas>
    </div>
  );
}
