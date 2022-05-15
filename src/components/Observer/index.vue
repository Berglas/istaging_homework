<template lang="pug">
.observer__container(ref='target')
  .loading-animation(v-show='showLoading')
    .loader
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
  },
  showLoading: {
    type: Boolean,
    default: false
  }
});

let observer: any = null;
const target = ref(null);

onMounted(() => {
  const options = {
    root: document.querySelector(props.rootSelector),
    rootMargin: '50px 0px' //間隔距離
  };

  observer = new IntersectionObserver(async ([entry]) => {
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
  position: relative
  width: 100%
  height: 50px
  .loading-animation
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    & > .loader
      border: 4px solid rgba(177,120,68, .2)
      border-top: 4px solid rgba(177,120,68, .6)
      border-left: 4px solid rgba(177,120,68, .6)
      border-radius: 50%
      width: 36px
      height: 36px
      animation: spin 1s linear infinite

  @keyframes spin
    0%
      transform: rotate(0deg)

    50%
      transform: rotate(270deg)

    100%
      transform: rotate(360deg)
</style>
