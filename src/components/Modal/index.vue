<template lang="pug">
.modal(v-if="modalIsOpen")
  .modal__content
    slot(name="content")
  .modal__close-button(@click="closeModal")
  .modal__mask
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void;
}>();

const modalIsOpen = ref<boolean>(false);
watch(
  () => props.modelValue,
  newVal => {
    modalIsOpen.value = newVal;
  },
  { immediate: true }
);

const closeModal = () => {
  modalIsOpen.value = false;
  emits('update:modelValue', false);
};
</script>
<style lang="sass" scoped>
.modal
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  height: 50%
  width: 50%
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.2)
  background: rgba(255, 255, 255, 1)
  border-radius: 4px
  z-index: 6000
  .modal__content
    position: relative
    height: 100%
    width: 100%
    z-index: 5000
    padding: 16px
    background: rgba(255, 255, 255, 1)
    border-radius: 4px
  .modal__mask
    position: absolute
    top: -100%
    left: -100%
    height: 200vh
    width: 200vw
    background: rgba(125, 125, 125, .5)
    z-index: 3000
  .modal__close-button
    position: absolute
    top: -.5rem
    right: -.5rem
    border-radius: 100%
    border: 2px solid rgba(66, 66, 66, 1)
    height: 1.5rem
    width: 1.5rem
    background: rgba(255, 255, 255, .8)
    z-index: 5000
    cursor: pointer
    &:after
      mask: url('~@/assets/times.svg') no-repeat 50% 50%
      background-color: rgba(66, 66, 66, 1)
      display: inline-block
      position: relative
      top: 0
      left: 0
      transform: translate(0, 0)
      content: ''
      display: block
      z-index: 100
      height: 100%
      width: 100%
</style>
