import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

// Lazy-loaded views (code-splitting-friendly)
const HomeView = () => import('@/views/HomeView.vue');
const DocumentationView = () => import('@/views/DocumentationView.vue');
const ExamplesView = () => import('@/views/ExamplesView.vue');
const BasicViewer = () => import('@/views/examples/BasicViewer.vue');
const MultipleViewers = () => import('@/views/examples/MultipleViewers.vue');
const HotspotsViewer = () => import('@/views/examples/HotspotsViewer.vue');
const SlotOverride = () => import('@/views/examples/SlotOverride.vue');
const CustomViewpoints = () => import('@/views/examples/CustomViewpoints.vue');

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/docs', name: 'documentation', component: DocumentationView },
  { path: '/examples', name: 'examples', component: ExamplesView },
  { path: '/examples/basic', name: 'basic-viewer', component: BasicViewer },
  { path: '/examples/multiple', name: 'multiple-viewers', component: MultipleViewers },
  { path: '/examples/hotspots', name: 'hotspots-viewer', component: HotspotsViewer },
  { path: '/examples/slots', name: 'slot-override', component: SlotOverride },
  { path: '/examples/viewpoints', name: 'custom-viewpoints', component: CustomViewpoints },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
