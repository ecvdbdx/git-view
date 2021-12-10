import { createRouter, createWebHistory } from 'vue-router';

import GitView from '@/modules/GitView';
import Home from '@/modules/HomePage';

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
