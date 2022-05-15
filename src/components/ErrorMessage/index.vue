<template lang="pug">
Modal(v-model='selfDisplay')
  template(v-slot:content)
    .form
      .message {{message}}
      .input
        .input__description
        .input__button.button(@click='close')
          p confirm
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import Modal from '@/components/Modal/index.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
});

const emits = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void;
}>();

const selfDisplay = ref<boolean>(false);
watch(
  () => props.modelValue,
  newVal => {
    selfDisplay.value = newVal;
  },
  { immediate: true }
);

watch(
  () => selfDisplay.value,
  newVal => {
    emits('update:modelValue', newVal);
  },
  { immediate: true }
);

const close = () => {
  selfDisplay.value = false;
};
</script>

<style lang="sass" scoped>
.form
  height: 500px
  width: 450px
  padding: 24px
  @include phone-screen
    height: 90%
    width: 90%
    min-width: 320px
    padding: 20px
  .input
    position: relative
    display: flex
    flex-flow: row nowrap
    margin-bottom: 19px
    @include phone-screen
      width: 100%
      flex-flow: column wrap
      margin-bottom: 7px
    .input__description
      position: relative
      width: 90px
      @include phone-screen
        width: 100%
        height: 19px
      span
        @include center-x
        height: 18px
        line-height: 18.75px
    .input__content
      height: 40px
      width: 300px
      padding: 4px
      border: 1px solid rgba(188, 188,188, 1)
      border-radius: 4px
      @include phone-screen
        width: 100%
    .input__button
      height: 48px
      width: 150px
      @include phone-screen
        height: 36px
        width: 120px
        position: absolute
        top: calc(50% + 12px)
        left: 50%
        transform: translate(-50%, -50%)
    .input__textarea
      border: 1px solid rgba(188, 188,188, 1)
      border-radius: 4px
      resize: none
      width: 300px
      height: 160px
      @include phone-screen
        width: 100%
</style>
