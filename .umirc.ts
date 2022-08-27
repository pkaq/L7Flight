import { defineConfig } from 'umi';

export default defineConfig({
  // base: '/map/',
  // publicPath: '/map/',
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/map' },
    { path: '/school', component: '@/pages/school' },
    { path: '/mapbox', component: '@/pages/mapbox' },
  ],
});
