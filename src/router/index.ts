import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Documentation from '../views/Documentation.vue'
import Examples from '../views/Examples.vue'
import BasicViewer from '../views/examples/BasicViewer.vue'
import MultipleViewers from '../views/examples/MultipleViewers.vue'
import HotspotsViewer from '../views/examples/HotspotsViewer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/docs',
      name: 'documentation',
      component: Documentation
    },
    {
      path: '/examples',
      name: 'examples',
      component: Examples
    },
    {
      path: '/examples/basic',
      name: 'basic-viewer',
      component: BasicViewer
    },
    {
      path: '/examples/multiple',
      name: 'multiple-viewers',
      component: MultipleViewers
    },
    {
      path: '/examples/hotspots',
      name: 'hotspots-viewer',
      component: HotspotsViewer
    }
  ]
})

export default router
