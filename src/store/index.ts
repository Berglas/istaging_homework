import { createPinia } from 'pinia';
import type { App } from 'vue';
import piniaPluginPersist from 'pinia-plugin-persist';

/** 啟動 pinia 的持久化插件 pinia-plugin-persist */
export function setupStore(app: App<Element>): void {
  const pinia = createPinia();
  pinia.use(piniaPluginPersist);
  app.use(pinia);
}
