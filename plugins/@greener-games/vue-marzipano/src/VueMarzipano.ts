import type {App} from 'vue'
import {AutoRotateButton,FullscreenButton,NavigateButton} from "./index";
import { useMarzipano } from "./composables/useMarzipano";

export default {
    install(app: App, options: any = {})
    {
        console.log('VueMarzipano installed');

        // Set global plugin options
        const { setPluginOptions } = useMarzipano();
        setPluginOptions(options);

        app.component('FullscreenButton', FullscreenButton);
        app.component('NavigateButton', NavigateButton);
        app.component('AutoRotateButton', AutoRotateButton);
    },
}
