import { resolveComponent } from 'vue';
import type { Component } from 'vue';
import { pluginOptions } from './pluginOptions';
import type { HotspotBase } from './types';

/** Returns copies of the hotspots with an id on each; hotspots without one get `<prefix>-<index>`. */
export function withIds<T extends HotspotBase>(hotspots: T[] | undefined, prefix: string) {
  return (hotspots ?? []).map((hotspot, index) => ({
    ...hotspot,
    id: hotspot.id ?? `${prefix}-${index}`,
  }));
}

// The URL the app is served from, from the plugin's `baseUrl` option
function baseUrl() {
  const base = pluginOptions.baseUrl ?? '/';
  return new URL(base.endsWith('/') ? base : `${base}/`, window.location.origin);
}

/** Resolves an image path from the scene data to a URL; relative paths resolve from `baseUrl`. */
export function resolveImageUrl(imagePath: string | undefined) {
  if (!imagePath) return '';
  return new URL(imagePath, baseUrl()).toString();
}

/** Resolves the folder that holds each scene's tile folder, without a trailing slash. */
export function resolveTilesUrl(url: string | undefined) {
  return new URL(url ?? 'tiles', baseUrl()).toString().replace(/\/$/, '');
}

/** Finds the component a hotspot or button `type` names: a built-in one, or one the app registered. */
export function resolveTypeComponent(
  type: string,
  builtIns: Record<string, Component>,
  kind: 'hotspot' | 'button',
): Component | null {
  const builtIn = builtIns[type];
  if (builtIn) return builtIn;

  const component = resolveComponent(type);
  if (typeof component !== 'string') return component;

  console.warn(
    `[vue-marzipano] No component is registered for the ${kind} type "${type}", so it isn't shown. ` +
      `Register one with app.component('${type}', …).`,
  );
  return null;
}
