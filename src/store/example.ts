import { defineStore } from 'pinia';

export const useExampleStore = defineStore({
  id: 'example',

  state: () => ({
    name: 'super admin',
    count: 0
  }),

  getters: {
    nameLength: state => state.name.length
  },

  actions: {
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    }
  }
});

/**
 * [import]
 * import { useExampleStore } from '@/store/example';
 * const exampleStore = useExampleStore();
 *
 * [state]
 * exampleStore.$patch({ name: 'test' })
 * exampleStore.count++
 * p {{ exampleStore.count }}
 *
 * [getters]
 * {{ exampleStore.nameLength }}
 *
 * [action] * 官方還是建議要依賴 action 來更改 state, 就算現在可以不透過 action 去改 state.
 * exampleStore.randomizeCounter()
 *
 * [reset]
 * exampleStore.$reset()
 */
