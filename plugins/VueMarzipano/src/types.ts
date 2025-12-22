export interface CloudConfig {
  enabled: boolean;
  url: string;
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

export interface LinkHotspot {
  id: string | number;
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
}

export interface InfoHotspot {
  yaw: number;
  pitch: number;
  title: string;
  text: string;
  type: string;
}

export interface SceneData {
  id: string;
  name: string;
  levels: Level[];
  faceSize: number;
  initialViewParameters: ViewParameters;
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
}

export interface NavigationButton {
  type: string;
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
  fullscreenButton: boolean;
  viewControlButtons: boolean;
  navigationButtons: NavigationButton[];
}

export interface MarzipanoData {
  name: string;
  cloud?: CloudConfig;
  scenes: SceneData[];
  settings: MarzipanoSettings;
  icons?: Record<string, string>;
}
