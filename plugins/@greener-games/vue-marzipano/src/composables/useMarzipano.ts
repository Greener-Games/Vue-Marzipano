import { computed, inject, nextTick, ref, shallowRef, watch } from 'vue';
import type { InjectionKey } from 'vue';
import { Marzipano } from '../marzipano';
import { resolveTilesUrl, withIds } from '../helpers';
import { pluginOptions } from '../pluginOptions';
import type {
  MarzipanoData,
  MarzipanoSceneHandle,
  MarzipanoViewerHandle,
  RenderedHotspot,
  SceneData,
  ViewParameters,
  ViewerScene,
} from '../types';

/** A hotspot for the viewer to render, keyed so its element can be found and handed to Marzipano. */
export interface PlacedHotspot {
  key: string;
  hotspot: RenderedHotspot;
}

export type MarzipanoController = ReturnType<typeof createMarzipano>['controls'];

export const marzipanoKey: InjectionKey<MarzipanoController> = Symbol('vue-marzipano');

/** Returns the state and controls of the nearest <MarzipanoViewer>, for components inside it. */
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
  const panoElement = shallowRef<HTMLElement | null>(null);
  const data = shallowRef<MarzipanoData | null>(null);
  const viewer = shallowRef<MarzipanoViewerHandle | null>(null);
  const scenes = shallowRef<ViewerScene[]>([]);
  const currentScene = shallowRef<ViewerScene | null>(null);
  const hotspots = shallowRef<PlacedHotspot[]>([]);
  const enableAutoRotate = ref(false);
  // Bumped on every rebuild so hotspot keys change and Vue renders fresh elements for Marzipano
  let generation = 0;

  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  // Runs here rather than in AutoRotateButton, so `autorotateEnabled` works without the button
  watch([enableAutoRotate, viewer, currentScene], ([enabled, activeViewer]) => {
    if (!activeViewer) return;
    activeViewer.stopMovement();
    if (enabled) {
      activeViewer.startMovement(autorotate);
      activeViewer.setIdleMovement(3000, autorotate);
    } else {
      activeViewer.setIdleMovement(Infinity);
    }
  });

  /**
   * Builds the Marzipano viewer for a tour, replacing any viewer already built.
   * @param element The element to mount the viewer on
   * @param tour The scenes and settings to show
   */
  function initMarzipano(element: HTMLElement, tour: MarzipanoData) {
    destroyMarzipano();
    generation += 1;
    panoElement.value = element;
    data.value = tour;

    const settings = tour.settings ?? {};
    enableAutoRotate.value = settings.autorotateEnabled ?? false;

    // baseUrl is for resolving paths; every other plugin option goes to the Marzipano viewer
    const { baseUrl: _baseUrl, ...viewerOptions } = pluginOptions;
    const newViewer = new Marzipano.Viewer(element, {
      controls: {
        mouseViewMode: settings.mouseViewMode ?? 'drag',
        scrollZoom: true,
      },
      ...viewerOptions,
    });

    const tilesUrl = resolveTilesUrl(tour.tiles?.url);
    const query = tour.tiles?.query ? `?${tour.tiles.query.replace(/^\?/, '')}` : '';
    const pending: (PlacedHotspot & { scene: MarzipanoSceneHandle })[] = [];

    scenes.value = tour.scenes.map((source) => {
      // A copy, so the ids and default types added here don't write back into the caller's data
      const sceneData: SceneData = {
        ...source,
        linkHotspots: withIds(source.linkHotspots, `${source.id}-link`).map((hotspot) => ({
          ...hotspot,
          type: hotspot.type ?? 'NavigationHotspot',
        })),
        infoHotspots: withIds(source.infoHotspots, `${source.id}-info`),
      };

      const tileSource = Marzipano.ImageUrlSource.fromString(
        `${tilesUrl}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg${query}`,
        { cubeMapPreviewUrl: `${tilesUrl}/${sceneData.id}/preview.jpg${query}` },
      );
      const geometry = new Marzipano.CubeGeometry(sceneData.levels);
      const limiter = Marzipano.RectilinearView.limit.traditional(
        Math.min(sceneData.faceSize * 8, 4096),
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180,
      );
      const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
      const scene = newViewer.createScene({
        source: tileSource,
        geometry,
        view,
        pinFirstLevel: true,
      });

      [...(sceneData.linkHotspots ?? []), ...(sceneData.infoHotspots ?? [])].forEach(
        (hotspot, index) => {
          pending.push({
            key: `${generation}-${sceneData.id}-${index}`,
            hotspot: hotspot as RenderedHotspot,
            scene,
          });
        },
      );

      return { data: sceneData, scene, view };
    });

    hotspots.value = pending.map(({ key, hotspot }) => ({ key, hotspot }));
    // Once Vue has rendered the hotspot elements, hand each one to Marzipano to position.
    // Look inside this viewer only: two viewers on a page render the same keys.
    void nextTick(() => {
      for (const { key, hotspot, scene } of pending) {
        const el = element.querySelector<HTMLElement>(`[data-hotspot-key="${CSS.escape(key)}"]`);
        if (el) {
          scene.hotspotContainer().createHotspot(el, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        }
      }
    });

    viewer.value = newViewer;
    switchScene(scenes.value[0] ?? null);
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
    viewer.value?.destroy();
    viewer.value = null;
    panoElement.value = null;
    data.value = null;
    scenes.value = [];
    currentScene.value = null;
    hotspots.value = [];
  }

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

  // What components inside the viewer (useMarzipano) and template refs get. Read-only views of
  // the state, so only the viewer changes it; enableAutoRotate is the one you can set.
  const controls = {
    data: computed(() => data.value),
    viewer: computed(() => viewer.value),
    scenes: computed(() => scenes.value),
    currentScene: computed(() => currentScene.value),
    panoElement: computed(() => panoElement.value),
    enableAutoRotate,
    switchScene,
    findSceneById,
    findSceneDataById,
    lookTo,
    setFov,
  };

  return { controls, hotspots, initMarzipano, destroyMarzipano };
}
