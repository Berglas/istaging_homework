<template lang="pug">
.modal(v-if="modalStatus")
  .modal__content
    slot(name="content")
  .close-btn(@click="closeModal")
  .modal__mask(@click="closeModal")
  //- .modal__header
  //-   slot(name="title")
  //-   .modal-headder__function
  //-       .close-btn( @click="closeModal")
  //- .modal-content
  //-   slot(name="content")
</template>
<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void;
}>();

const modalStatus = ref<boolean>(false);
watch(
  () => props.modelValue,
  newVal => {
    modalStatus.value = newVal;
  },
  { immediate: true }
);

const closeModal = () => {
  modalStatus.value = false;
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
  padding: 16px
  border-radius: 4px
  z-index: 6000
  .modal__content
    position: relative
    height: 100%
    width: 100%
    z-index: 4000
    background: rgba(255, 255, 255, 1)
  .modal__mask
    position: absolute
    top: -100%
    left: -100%
    height: 200vh
    width: 200vw
    background: rgba(125, 125, 125, .5)
    z-index: 3000

// .modal-header
//     background: #f1f1f1
//     @extend .border
//     display: flex
//     justify-content: space-between
//     padding: 1rem 1rem
//     margin-bottom: -1px
//     height: 3rem
// .modal-headder__function
//     display: flex
// .modal-function__item
//     margin-left: 1rem
//     cursor: pointer
// .modal-content
//   width: 100%
//   height: calc(100% - 3rem)
.close-btn
  position: absolute
  top: 0
  right: 0
  width: 24px
  height: 24px
  padding: 8px
  border-radius: 100%
  display: flex
  justify-content: center
  align-items: center
  background: #0004
  transform: translate(50%, -50%)
  color: #fff
  font-weight: 700
  cursor: pointer
  transition: 0.2s
  z-index: 5000
  &:hover
    background: #0007
    transform: translate(50%, -50%) scale(1.1)
</style>
