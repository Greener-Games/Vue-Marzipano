import { createApp } from 'vue';
import App from '@/App.vue';

import '@/assets/main.css';

import router from '@/router';
import { createPinia } from 'pinia';
import { logger } from '@/utils/logger';

import VueMarzipano from '@greener-games/vue-marzipano';
import '@greener-games/vue-marzipano/style.css';

import InfoHotspot from '@/components/InfoHotspot.vue';
import CustomImageHotspot from '@/components/CustomImageHotspot.vue';

logger.info('Application initializing...');

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Hotspot components referenced by `type` in the scene data
app.component('InfoHotspot', InfoHotspot);
app.component('CustomImageHotspot', CustomImageHotspot);

// Tile and image paths in the scene data resolve from where the app is served
app.use(VueMarzipano, { baseUrl: import.meta.env.BASE_URL });

app.mount('#app');
logger.info('Application successfully mounted.');
