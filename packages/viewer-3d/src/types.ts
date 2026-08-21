import { ReactNode } from 'react';

export interface ModelViewerProps {
  children?: ReactNode;
  className?: string;
  showGrid?: boolean;
  showControls?: boolean;
  environment?:
    | 'studio'
    | 'city'
    | 'sunset'
    | 'dawn'
    | 'night'
    | 'warehouse'
    | 'forest'
    | 'apartment'
    | 'park'
    | 'lobby';
}

export interface Scene3DProps {
  rotation?: boolean;
  scale?: number;
  position?: [number, number, number];
}
