import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/map', component: '@/pages/map' },
    { path: '/mapbox', component: '@/pages/mapbox' },
  ],
});
