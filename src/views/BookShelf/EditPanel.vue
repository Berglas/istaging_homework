<template lang="pug">
Modal(v-model='selfDisplay')
  template(v-slot:content)
    .form
      .input
        .input__description.required
          span Name
        input.input__content(v-model='form.title')
      .input
        .input__description.required
          span Author
        input.input__content(v-model='form.author')
      .input
        .input__description.required
          span Pub Date
        input.input__content(v-model='form.publicationDate' type="date")
      .input
        .input__description
          span ISBN
        input.input__content(v-model='form.isbn')
      .input
        .input__description.required
          span Description
        textarea.input__textarea(v-model='form.description')
      .input
        .input__description
        .input__button.button(@click='handleBook(form)')
          p Save
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, watch, PropType } from 'vue';
import api, { EditBookReq, AddBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import Modal from '@/components/Modal/index.vue';
import editPanel from './composables/editPanel';
const { goToDetail } = editPanel();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  bookFormData: {
    type: Object as PropType<BookFormData>,
    default: {
      id: '',
      author: '',
      description: '',
      isbn: '',
      publicationDate: '',
      title: ''
    } as BookFormData
  },
  mode: {
    type: String as PropType<ActionMode.ADD | ActionMode.EDIT>,
    default: ActionMode.ADD
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

const form = ref<BookFormData>({
  id: '',
  author: '',
  description: '',
  isbn: '',
  publicationDate: '',
  title: ''
} as BookFormData);

watch(
  () => props.bookFormData,
  newVal => {
    form.value = newVal;
  },
  { immediate: true }
);

const handleBook = (data: BookFormData) => {
  if (!checkData(data)) {
    return;
  }

  let archivedAt = new Date().toISOString();
  let publicationDate = new Date(data.publicationDate).toISOString();
  if (props.mode === ActionMode.ADD) {
    let params: AddBookReq = {
      author: data.author,
      description: data.description,
      isbn: data.isbn as string,
      publicationDate: publicationDate,
      title: data.title,
      reviews: [],
      cover: '',
      archivedAt: archivedAt
    };
    addBook(params);
  } else if (props.mode === ActionMode.EDIT) {
    let params: EditBookReq = {
      id: data.id as string,
      author: data.author,
      description: data.description,
      isbn: data.isbn as string,
      publicationDate: publicationDate,
      title: data.title
    };
    editBook(params);
  }
  selfDisplay.value = false;
};

const checkData = (data: BookFormData): boolean => {
  let message = '';
  if (data.title === '') {
    message += '請填寫書名\n';
  }
  if (data.author === '') {
    message += '請填寫作者\n';
  }
  if (data.publicationDate === '') {
    message += '請填寫出版日期\n';
  }
  if (data.description === '') {
    message += '請填寫書本描述\n';
  }

  if (message === '') {
    return true;
  } else {
    showError(message);
    return false;
  }
};

const showError = (message: string) => {
  alert(message);
};

const addBook = (data: AddBookReq) => {
  api
    .addBook(data)
    .then(res => {
      goToDetail(res.data);
    })
    .catch(err => {
      showError(err);
    });
};

const editBook = (data: EditBookReq) => {
  api.editBook(data);
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
