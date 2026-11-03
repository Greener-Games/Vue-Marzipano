import { reactive } from 'vue';
import type { VueMarzipanoOptions } from './types';

// Options passed to app.use(VueMarzipano, options). Kept in its own module so helpers and the
// composable can both read it without importing each other.
export const pluginOptions = reactive<VueMarzipanoOptions>({});

/** Stores the options given to app.use() so every viewer and helper can read them. */
export function setPluginOptions(options: VueMarzipanoOptions) {
  Object.assign(pluginOptions, options);
}
