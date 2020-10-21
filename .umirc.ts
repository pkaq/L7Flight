import { defineConfig } from 'umi';

export default defineConfig({
  // base: '/map/',
  // publicPath: '/map/',
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/map', component: '@/pages/map' },
    { path: '/c', component: '@/pages/drawer/chart' },
    { path: '/mapbox', component: '@/pages/mapbox' },
  ],
});
