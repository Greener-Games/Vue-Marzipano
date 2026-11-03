import type { App } from 'vue';
import AutoRotateButton from './Components/Buttons/AutoRotateButton.vue';
import FullscreenButton from './Components/Buttons/FullscreenButton.vue';
import NavigateButton from './Components/Buttons/NavigateButton.vue';
import { setPluginOptions } from './pluginOptions';
import type { VueMarzipanoOptions } from './types';

export default {
  install(app: App, options: VueMarzipanoOptions = {}) {
    // Set global plugin options. `env` is the host app's import.meta.env: a published library
    // can't read the host's env itself, because its own import.meta.env is fixed at build time.
    setPluginOptions(options);

    app.component('FullscreenButton', FullscreenButton);
    app.component('NavigateButton', NavigateButton);
    app.component('AutoRotateButton', AutoRotateButton);
  },
};
