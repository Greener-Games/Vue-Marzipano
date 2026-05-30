import Marzipano from "marzipano";
import { ref, nextTick, reactive } from "vue";
import { findEnvVariableByKey, updateHotspots } from "../helpers";
import type { MarzipanoData, SceneData, ViewParameters } from "../types";

// Shared state (Singleton pattern)
const panoElement = ref<HTMLElement | null>(null);
const viewer = ref<any>(null);
const scenes = ref<any[]>([]);
const currentScene = ref<any>(null);
const allHotspots = ref<any[]>([]);
const enableAutoRotate = ref(false);
const autorotateSettings = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2
});

// Global plugin options
const pluginOptions = reactive<any>({});

export function useMarzipano() {

    /**
     * Initialize the Marzipano viewer
     * @param element The HTML element to mount the viewer on
     * @param data The data object containing scenes and settings
     * @param options Optional configuration override
     */
    function initMarzipano(element: HTMLElement, data: MarzipanoData, options: any = {}) {
        panoElement.value = element;

        // Merge global options with local options
        const config = { ...pluginOptions, ...options };

        // Initialize auto rotate setting from data if available
        if (data.settings && data.settings.autorotateEnabled !== undefined) {
             enableAutoRotate.value = data.settings.autorotateEnabled;
        }

        const viewerOpts = {
            controls: {
                mouseViewMode: data.settings.mouseViewMode,
                scrollZoom: true
            },
            ...config // Apply any viewer options from config
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
                    { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg?${key}` }
                );
            } else {
                urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
                source = Marzipano.ImageUrlSource.fromString(
                    `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
                    { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` }
                );
            }

            const geometry = new Marzipano.CubeGeometry(sceneData.levels);
            const limiter = Marzipano.RectilinearView.limit.traditional(
                Math.min(sceneData.faceSize * 8, 4096),
                100 * Math.PI / 180,
                120 * Math.PI / 180
            );
            const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
            const createdScene = newViewer.createScene({ source, geometry, view, pinFirstLevel: true });

            // Normalize hotspots IDs
            sceneData.linkHotspots = updateHotspots(sceneData.linkHotspots);
            sceneData.infoHotspots = updateHotspots(sceneData.infoHotspots);

            // Collect all hotspots for rendering in Vue (if using Vue-based hotspots)
            allHotspots.value.push(...sceneData.linkHotspots, ...sceneData.infoHotspots);

            nextTick(() => {
                [...sceneData.linkHotspots, ...sceneData.infoHotspots].forEach((x: any) => {
                    const el = document.getElementById(x.id);
                    if (el) {
                        createdScene.hotspotContainer().createHotspot(el, { yaw: x.yaw, pitch: x.pitch });
                    }
                });
            });

            return { data: sceneData, scene: createdScene, view };
        });

        viewer.value = newViewer;
        if (scenes.value.length > 0) {
            switchScene(scenes.value[0]);
        }
    }

    function switchScene(scene: any) {
        if (!scene) return;
        scene.view.setParameters(scene.data.initialViewParameters);
        scene.scene.switchTo();
        currentScene.value = scene;
    }

    function findSceneById(id: string) {
        return scenes.value.find((scene: any) => scene.data.id === id) || null;
    }

    function findSceneDataById(id: string) {
         const scene = findSceneById(id);
         return scene ? scene.data : null;
    }

    function destroyMarzipano() {
        if (viewer.value) {
            viewer.value.destroy(); // Assuming Marzipano viewer has a destroy method
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

    function setPluginOptions(options: any) {
        Object.assign(pluginOptions, options);
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
        setPluginOptions
    };
}
