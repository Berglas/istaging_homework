<template lang="pug">
.observer__container(ref='target')
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps({
  handleIntersect: {
    type: Function,
    default: () => {
      console.log(123);
    }
  },
  rootSelector: {
    type: String,
    default: '.class'
  }
});

let observer = null;
const target = ref(null);

onMounted(() => {
  const options = {
    root: document.querySelector(props.rootSelector),
    rootMargin: '200px 0px' //間隔距離
  };

  observer = new IntersectionObserver(([entry]) => {
    // 當目標與根重疊
    if (entry && entry.isIntersecting) {
      props.handleIntersect();
    }
  }, options);

  // 目標元素
  observer.observe(target.value);
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>
<style lang="sass" scoped>
.observer__container
  width: 100%
  height: 1px
  background: transparent
</style>
