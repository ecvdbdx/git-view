import { createRouter, createWebHistory } from 'vue-router';

import GitView from '@/pages/GitView.vue';
import Home from '@/pages/Homepage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/gitview',
    name: 'GitView',
    component: GitView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
