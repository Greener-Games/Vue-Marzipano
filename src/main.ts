import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import VueMarzipano from "@greener-games/vue-marzipano";
import "@greener-games/vue-marzipano/style.css";

import InfoHotspot from "./components/InfoHotspot.vue";
import router from './router'

const app = createApp(App)

app.use(router)
app.component('InfoHotspot', InfoHotspot);
app.use(VueMarzipano)
app.mount('#app')
