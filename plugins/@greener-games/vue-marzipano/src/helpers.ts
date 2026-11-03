import { pluginOptions } from './pluginOptions';
import type { HotspotBase } from './types';

/** Generates a short random id for hotspots that don't define one. */
export function generateGUID() {
  return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Returns the hotspots with an id on each, so they can be matched to their rendered element. */
export const updateHotspots = <T extends HotspotBase>(hotspots: T[]) => {
  return hotspots.map((c) => ({
    ...c,
    id: c?.id || generateGUID(),
  }));
};

/** Resolves an image path from the scene data to a URL; relative paths resolve from the site root. */
export function GetImage(imagePath: string | undefined) {
  if (!imagePath) return '';
  return new URL(imagePath, `${window.location.origin}/`).toString();
}

/** Looks up a value in the env the host app passed to app.use(VueMarzipano, { env }). */
export function findEnvVariableByKey(key: string): string | null {
  const env = pluginOptions.env;
  if (env && Object.prototype.hasOwnProperty.call(env, key)) {
    return String(env[key]);
  } else {
    console.warn(`[vue-marzipano] No environment variable found with the key: ${key}`);
    return null;
  }
}
