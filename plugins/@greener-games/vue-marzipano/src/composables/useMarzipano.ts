import { inject, ref, shallowRef, nextTick } from 'vue';
import type { InjectionKey } from 'vue';
import { Marzipano } from '../marzipano';
import { findEnvVariableByKey, updateHotspots } from '../helpers';
import { pluginOptions, setPluginOptions } from '../pluginOptions';
import type {
  MarzipanoData,
  MarzipanoViewerHandle,
  RenderedHotspot,
  SceneData,
  ViewParameters,
  ViewerScene,
  VueMarzipanoOptions,
} from '../types';

export type MarzipanoController = ReturnType<typeof createMarzipano>;

export const marzipanoKey: InjectionKey<MarzipanoController> = Symbol('vue-marzipano');

/** Returns the controls of the nearest <MarzipanoViewer>, for components rendered inside it. */
export function useMarzipano(): MarzipanoController {
  const controller = inject(marzipanoKey, null);
  if (!controller) {
    throw new Error(
      '[vue-marzipano] useMarzipano() must be called inside <MarzipanoViewer>. ' +
        'From outside, use a template ref on the viewer instead.',
    );
  }
  return controller;
}

/** Creates the state and controls for one viewer: scenes, hotspots, scene switching, camera. */
export function createMarzipano() {
  // Each viewer gets its own state. Marzipano's own objects are held in shallow refs so Vue
  // doesn't wrap them in reactive proxies, which breaks Marzipano's identity checks.
  const panoElement = ref<HTMLElement | null>(null);
  const viewer = shallowRef<MarzipanoViewerHandle | null>(null);
  const scenes = shallowRef<ViewerScene[]>([]);
  const currentScene = shallowRef<ViewerScene | null>(null);
  const allHotspots = ref<RenderedHotspot[]>([]);
  const enableAutoRotate = ref(false);
  const autorotateSettings = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  /**
   * Initialize the Marzipano viewer
   * @param element The HTML element to mount the viewer on
   * @param data The data object containing scenes and settings
   * @param options Optional configuration override
   */
  function initMarzipano(
    element: HTMLElement,
    data: MarzipanoData,
    options: VueMarzipanoOptions = {},
  ) {
    panoElement.value = element;

    // Merge global options with local options (env is for helpers, not the Marzipano viewer)
    const { env: _env, ...config } = { ...pluginOptions, ...options };

    // Initialize auto rotate setting from data if available
    if (data.settings && data.settings.autorotateEnabled !== undefined) {
      enableAutoRotate.value = data.settings.autorotateEnabled;
    }

    const viewerOpts = {
      controls: {
        mouseViewMode: data.settings.mouseViewMode,
        scrollZoom: true,
      },
      ...config, // Apply any viewer options from config
    };

    // Clean up existing viewer if it exists
    if (viewer.value) {
      destroyMarzipano();
    }

    const newViewer = new Marzipano.Viewer(element, viewerOpts);

    // Reset hotspots before processing scenes
    allHotspots.value = [];

    scenes.value = data.scenes.map((sceneData: SceneData) => {
      let urlPrefix;
      let source;
      if (data?.cloud?.enabled) {
        urlPrefix = data.cloud.url;
        const key = findEnvVariableByKey(data.cloud.key);
        source = Marzipano.ImageUrlSource.fromString(
          `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg?${key}`,
          { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg?${key}` },
        );
      } else {
        urlPrefix = new URL('/tiles', import.meta.url.replace('/@fs', '')).toString();
        source = Marzipano.ImageUrlSource.fromString(
          `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
          { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` },
        );
      }

      const geometry = new Marzipano.CubeGeometry(sceneData.levels);
      const limiter = Marzipano.RectilinearView.limit.traditional(
        Math.min(sceneData.faceSize * 8, 4096),
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180,
      );
      const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
      const createdScene = newViewer.createScene({ source, geometry, view, pinFirstLevel: true });

      // Normalize hotspots IDs
      sceneData.linkHotspots = updateHotspots(sceneData.linkHotspots);
      sceneData.infoHotspots = updateHotspots(sceneData.infoHotspots);
      const sceneHotspots = [
        ...sceneData.linkHotspots,
        ...sceneData.infoHotspots,
      ] as RenderedHotspot[];

      // Collect all hotspots for rendering in Vue (if using Vue-based hotspots)
      allHotspots.value.push(...sceneHotspots);

      void nextTick(() => {
        sceneHotspots.forEach((x) => {
          // Look inside this viewer only: two viewers on a page can share hotspot ids
          const el = element.querySelector<HTMLElement>(
            `[data-hotspot-id="${CSS.escape(String(x.id))}"]`,
          );
          if (el) {
            createdScene.hotspotContainer().createHotspot(el, { yaw: x.yaw, pitch: x.pitch });
          }
        });
      });

      return { data: sceneData, scene: createdScene, view };
    });

    viewer.value = newViewer;
    if (scenes.value.length > 0) {
      switchScene(scenes.value[0] ?? null);
    }
  }

  function switchScene(scene: ViewerScene | null, params?: ViewParameters) {
    if (!scene) return;
    scene.view.setParameters(params || scene.data.initialViewParameters);
    scene.scene.switchTo();
    currentScene.value = scene;
  }

  function findSceneById(id: string) {
    return scenes.value.find((scene) => scene.data.id === id) || null;
  }

  function findSceneDataById(id: string) {
    const scene = findSceneById(id);
    return scene ? scene.data : null;
  }

  function destroyMarzipano() {
    if (viewer.value) {
      viewer.value.destroy();
      viewer.value = null;
    }
    panoElement.value = null;
    scenes.value = [];
    currentScene.value = null;
    allHotspots.value = [];
  }

  // --- Extended API ---

  function lookTo(yaw: number, pitch: number, fov?: number, immediate: boolean = false) {
    if (currentScene.value) {
      const params = { yaw, pitch, fov: fov || currentScene.value.view.fov() };
      if (immediate) {
        currentScene.value.view.setParameters(params);
      } else {
        // Marzipano lookTo animation
        if (viewer.value) {
          currentScene.value.scene.lookTo(params);
        }
      }
    }
  }

  function setFov(fov: number) {
    if (currentScene.value) {
      const params = currentScene.value.view.parameters();
      params.fov = fov;
      currentScene.value.view.setParameters(params);
    }
  }

  return {
    panoElement,
    viewer,
    scenes,
    currentScene,
    allHotspots,
    enableAutoRotate,
    autorotateSettings,
    initMarzipano,
    switchScene,
    findSceneById,
    findSceneDataById,
    destroyMarzipano,
    lookTo,
    setFov,
    setPluginOptions,
  };
}
