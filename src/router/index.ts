import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book_shelf',
    name: 'BookShelf',
    component: () => import('../views/BookShelf/index.vue')
  },
  {
    path: '/book_detail/:id',
    name: 'BookDetail',
    component: () => import('../views/BookDetail/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
