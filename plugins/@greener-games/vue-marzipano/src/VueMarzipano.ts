import type {App} from 'vue'
import {AutoRotateButton,FullscreenButton,NavigateButton} from "./index";
import { setPluginOptions } from "./pluginOptions";

export default {
    install(app: App, options: { env?: Record<string, any>, [key: string]: any } = {})
    {
        console.log('VueMarzipano installed');

        // Set global plugin options. `env` is the host app's import.meta.env: a published library
        // can't read the host's env itself, because its own import.meta.env is fixed at build time.
        setPluginOptions(options);

        app.component('FullscreenButton', FullscreenButton);
        app.component('NavigateButton', NavigateButton);
        app.component('AutoRotateButton', AutoRotateButton);
    },
}
