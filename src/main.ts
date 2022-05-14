import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'reset-css';
import { setupStore } from '@/store';

createApp(App).use(router).mount('#app');

async function init() {
  const app = createApp(App);
  setupStore(app);
  app.use(router);
  app.mount('#app');
}

init();
