import type { App } from 'vue';
import { setPluginOptions } from './pluginOptions';
import type { VueMarzipanoOptions } from './types';

export default {
  install(_app: App, options: VueMarzipanoOptions = {}) {
    // Only stores the options: no components are registered globally, so they can't clash with
    // the app's own. Import <MarzipanoViewer> where you use it.
    setPluginOptions(options);
  },
};
