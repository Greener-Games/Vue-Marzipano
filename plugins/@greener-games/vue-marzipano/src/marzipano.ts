import MarzipanoLib from 'marzipano';
import type {
  Level,
  MarzipanoMovement,
  MarzipanoViewHandle,
  MarzipanoViewerHandle,
  ViewParameters,
} from './types';

interface MarzipanoModule {
  Viewer: new (element: HTMLElement, opts?: Record<string, unknown>) => MarzipanoViewerHandle;
  ImageUrlSource: {
    fromString(url: string, opts?: { cubeMapPreviewUrl?: string }): unknown;
  };
  CubeGeometry: new (levels: Level[]) => unknown;
  RectilinearView: {
    new (params: ViewParameters, limiter?: unknown): MarzipanoViewHandle;
    limit: {
      traditional(maxResolution: number, maxVFov: number, maxHFov?: number): unknown;
    };
  };
  autorotate(opts: {
    yawSpeed?: number;
    targetPitch?: number;
    targetFov?: number;
  }): MarzipanoMovement;
}

// The single typed boundary to the untyped marzipano module.
export const Marzipano = MarzipanoLib as MarzipanoModule;
