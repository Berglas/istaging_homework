<template lang="pug">
.form
  .button(@click='handleBook(form)') Save
  .input
    .input__description Name
    input.input__content(v-model='form.title')
    .input__description Author
    input.input__content(v-model='form.author')
    .input__description Pub Date
    input.input__content(v-model='form.publicationDate')
    .input__description ISBN
    input.input__content(v-model='form.isbn')
    .input__description Description
    input.input__content(v-model='form.description')
</template>

<script setup lang="ts">
import { ref, onMounted, watch, PropType } from 'vue';
import api, { EditBookReq, AddBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';

const props = defineProps({
  modelValue: {
    type: Object as PropType<BookFormData>,
    default: {
      id: '',
      author: 'test author',
      description: 'test description',
      isbn: '',
      publicationDate: '2022-05-08T05:51:57.230Z',
      title: 'test name'
    } as BookFormData
  },
  mode: {
    type: String,
    default: ActionMode.ADD
  }
});

const form = ref<BookFormData>({
  id: '',
  author: 'test author',
  description: 'test description',
  isbn: '',
  publicationDate: '2022-05-08T05:51:57.230Z',
  title: 'test name'
} as BookFormData);

watch(
  () => props.modelValue,
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

<style lang="sass" scoped></style>
