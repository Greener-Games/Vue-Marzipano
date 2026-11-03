// ---- Scene data (the `data` prop of <MarzipanoViewer>) ----

export interface CloudConfig {
  enabled: boolean;
  url: string;
  /** Name of the env variable holding the query string appended to tile URLs. */
  key: string;
}

export interface Level {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}

export interface ViewParameters {
  yaw: number;
  pitch: number;
  fov: number;
}

/** Fields shared by every hotspot. Extra fields are passed through to custom hotspot components. */
export interface HotspotBase {
  id?: string | number;
  yaw: number;
  pitch: number;
  /** Name of a registered component to render this hotspot with. */
  type?: string;
  [key: string]: unknown;
}

export interface LinkHotspot extends HotspotBase {
  /** Id of the scene to switch to. */
  target: string;
  rotation?: number;
  /** Image path used instead of `icons.defaultNavigationIcon`. */
  imageOverride?: string;
}

export interface InfoHotspot extends HotspotBase {
  title?: string;
  text?: string;
}

/** A hotspot after the viewer has given it an id, as passed to hotspot components. */
export type RenderedHotspot = (LinkHotspot | InfoHotspot) & { id: string | number };

export interface SceneData {
  id: string;
  name: string;
  levels: Level[];
  faceSize: number;
  initialViewParameters: ViewParameters;
  /** View used when arriving through a navigation hotspot; defaults to `initialViewParameters`. */
  navigationViewParameters?: ViewParameters;
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
}

export interface NavigationButton {
  /** Name of a registered component, e.g. `NavigateButton`, `FullscreenButton`, `AutoRotateButton`. */
  type: string;
  /** Accessible name for the button; a sensible default is derived when omitted. */
  label?: string;
  imageOn?: string;
  imageOff?: string;
  imageName?: string;
  zoomFactor?: number;
  xFactor?: number;
  yFactor?: number;
}

export interface MarzipanoSettings {
  mouseViewMode: string;
  autorotateEnabled: boolean;
  fullscreenButton?: boolean;
  viewControlButtons?: boolean;
  navigationButtons: NavigationButton[];
}

export interface MarzipanoData {
  name: string;
  cloud?: CloudConfig;
  scenes: SceneData[];
  settings: MarzipanoSettings;
  icons?: Record<string, string>;
}

// ---- Plugin options (app.use(VueMarzipano, options)) ----

export interface VueMarzipanoOptions {
  /** The host app's env (pass `import.meta.env`), used to look up `cloud.key`. */
  env?: Record<string, unknown>;
  /** Any other option is passed to the Marzipano viewer constructor. */
  [key: string]: unknown;
}

// ---- The parts of Marzipano's runtime API the plugin uses (it ships without types) ----

/** Opaque movement function, as returned by Marzipano.autorotate(). */
export type MarzipanoMovement = (...args: unknown[]) => unknown;

export interface MarzipanoViewHandle {
  yaw(): number;
  pitch(): number;
  fov(): number;
  setYaw(yaw: number): void;
  setPitch(pitch: number): void;
  setFov(fov: number): void;
  parameters(): ViewParameters;
  setParameters(params: Partial<ViewParameters>): void;
}

export interface MarzipanoHotspotContainer {
  createHotspot(element: HTMLElement, coords: { yaw: number; pitch: number }): unknown;
}

export interface MarzipanoSceneHandle {
  switchTo(): void;
  lookTo(params: Partial<ViewParameters>): void;
  hotspotContainer(): MarzipanoHotspotContainer;
}

export interface MarzipanoViewerHandle {
  createScene(spec: {
    source: unknown;
    geometry: unknown;
    view: MarzipanoViewHandle;
    pinFirstLevel?: boolean;
  }): MarzipanoSceneHandle;
  destroy(): void;
  startMovement(movement: MarzipanoMovement): void;
  stopMovement(): void;
  setIdleMovement(timeout: number, movement?: MarzipanoMovement): void;
}

/** A scene as the viewer tracks it: its data plus the live Marzipano objects. */
export interface ViewerScene {
  data: SceneData;
  scene: MarzipanoSceneHandle;
  view: MarzipanoViewHandle;
}
