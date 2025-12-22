import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import VueMarzipano from "@VueMarzipano/index.ts";
import "@VueMarzipano/style.scss";

import InfoHotspot from "./components/InfoHotspot.vue";
import CustomHotspot from "./components/CustomHotspot.vue";

const app = createApp(App)

app.component('InfoHotspot', InfoHotspot);
app.component('CustomHotspot', CustomHotspot); // Register for the example
app.use(VueMarzipano)
app.mount('#app')
