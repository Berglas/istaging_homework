<template lang="pug">
Modal(v-model='selfDisplay')
  template(v-slot:content)
    .form
      .input
        .input__description 
          p Name
        input.input__content(v-model='form.title')
      .input
        .input__description Author
        input.input__content(v-model='form.author')
      .input  
        .input__description Pub Date
        input.input__content(v-model='form.publicationDate')
      .input  
        .input__description ISBN
        input.input__content(v-model='form.isbn')
      .input  
        .input__description Description
        input.input__content(v-model='form.description')
      .button(@click='handleBook(form)') Save
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, watch, PropType } from 'vue';
import api, { EditBookReq, AddBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import Modal from '@/components/Modal/index.vue';
const show = ref<boolean>(true);
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
  author: 'test author',
  description: 'test description',
  isbn: '',
  publicationDate: '2022-05-08T05:51:57.230Z',
  title: 'test name'
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

  if (props.mode === ActionMode.ADD) {
    let params: AddBookReq = {
      author: data.author,
      description: data.description,
      isbn: data.isbn as string,
      publicationDate: data.publicationDate,
      title: data.title,
      reviews: [],
      cover: '',
      archivedAt: data.publicationDate
    };
    addBook(params);
  } else if (props.mode === ActionMode.EDIT) {
    let params: EditBookReq = {
      id: data.id as string,
      author: data.author,
      description: data.description,
      isbn: data.isbn as string,
      publicationDate: data.publicationDate,
      title: data.title
    };
    editBook(params);
  }
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
  api.addBook(data);
};

const editBook = (data: EditBookReq) => {
  api.editBook(data);
};
</script>

<style lang="sass" scoped>
.input
  display: flex
  flex-flow: row nowrap
  // justify-content: center
  align-content: center
  .input__description
    display: flex
    justify-content: center
    align-content: center
    height: 40px
  .input__content
    padding: 4px
    border: 1px solid rgba(188, 188,188, 1)
    border-radius: 4px
    margin-left: 8px
</style>
