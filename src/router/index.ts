import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: to => {
      return { path: '/book_shelf' };
    }
  },
  {
    path: '/book_shelf',
    name: 'BookShelf',
    component: () => import('../views/BookShelf/index.vue')
  },
  {
    path: '/book_detail',
    name: 'BookDetail',
    component: () => import('../views/BookDetail/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
