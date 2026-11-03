import { inject, provide } from 'vue';
import type { Ref } from 'vue';
import type {
  MarzipanoData,
  MarzipanoMovement,
  MarzipanoViewerHandle,
  SceneData,
  ViewParameters,
  ViewerScene,
} from './types';

export interface MarzipanoViewFunctions {
  switchScene(scene: ViewerScene | null, params?: ViewParameters): void;
  findSceneById(id: string): ViewerScene | null;
  findSceneDataById(id: string): SceneData | null;
}

/** Everything a <MarzipanoViewer> shares with the components rendered inside it. */
export interface MarzipanoContext {
  scenes: Ref<ViewerScene[]>;
  viewer: Ref<MarzipanoViewerHandle | null>;
  data: MarzipanoData;
  currentScene: Ref<ViewerScene | null>;
  panoElement: Ref<HTMLElement | null>;
  enableAutoRotate: Ref<boolean>;
  autorotateSettings: MarzipanoMovement;
  viewFunctions: MarzipanoViewFunctions;
}

// Plain string keys, so custom hotspot and button components can inject them directly.
const keys = {
  scenes: 'scenes',
  viewer: 'viewer',
  data: 'data',
  currentScene: 'currentScene',
  panoElement: 'panoElement',
  enableAutoRotate: 'enableAutoRotate',
  autorotateSettings: 'autorotateSettings',
  viewFunctions: 'marzipanoViewFunctions',
} as const satisfies Record<keyof MarzipanoContext, string>;

/** Shares a viewer's state with its descendants. */
export function provideMarzipanoContext(context: MarzipanoContext) {
  for (const name of Object.keys(keys) as (keyof MarzipanoContext)[]) {
    provide(keys[name], context[name]);
  }
}

/** Reads the state of the nearest <MarzipanoViewer>. */
export function useMarzipanoContext(): MarzipanoContext {
  const context = {} as Record<keyof MarzipanoContext, unknown>;
  for (const name of Object.keys(keys) as (keyof MarzipanoContext)[]) {
    const value = inject<unknown>(keys[name]);
    if (value === undefined) {
      throw new Error(
        `[vue-marzipano] "${keys[name]}" not provided: use this inside <MarzipanoViewer>`,
      );
    }
    context[name] = value;
  }
  return context as MarzipanoContext;
}
