'use client';

import { Suspense } from 'react';
import type { ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { ModelViewerProps } from './types.js';

// drei doesn't re-export PresetsType from a stable subpath, so pull the exact
// `preset` prop type off the Environment component itself — robust to drei's
// internal module layout under nodenext resolution.
type EnvironmentPreset = NonNullable<ComponentProps<typeof Environment>['preset']>;
import { LoadingSpinner } from './LoadingSpinner.js';

export function ModelViewer({
  children,
  className,
  showGrid = true,
  showControls = true,
  environment = 'studio',
}: ModelViewerProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          {showGrid && (
            <Grid
              args={[10, 10]}
              cellColor="#6B7280"
              sectionColor="#374151"
              fadeDistance={30}
              fadeStrength={1}
              cellSize={1}
              sectionSize={3}
              followCamera={false}
              infiniteGrid={true}
            />
          )}
          {showControls && <OrbitControls enableDamping />}
          <Environment preset={environment as EnvironmentPreset} />
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
