<template lang="pug">
.list
  EditPanel(v-model='selectBook' :mode='actionMode')
  .book(v-for='bookItem in bookList' :key='bookItem.id') 
    .book__img(@click='displayDetail(bookItem)')
    .book__content
      .book__content__title {{bookItem.title}}
      .book__content__author {{bookItem.author}}
</template>

<script setup lang="ts">
import { Router, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import api, { BookInfo, EditBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import EditPanel from './EditPanel.vue';

const router: Router = useRouter();

const bookList = ref<Array<BookInfo>>([]);

const selectBook = ref<BookFormData>({
  id: '',
  author: 'test author',
  description: 'test description',
  isbn: '',
  publicationDate: '2022-05-08T05:51:57.230Z',
  title: 'test name'
} as BookFormData);

const actionMode = ref<ActionMode.ADD | ActionMode.EDIT>(ActionMode.ADD);

onMounted(() => {
  api
    .getBookList({ page: 1, itemsPerPage: 2 })
    .then(res => {
      bookList.value = res.data['hydra:member'];
    })
    .catch(err => {
      console.log(err);
    });
});

const displayDetail = (data: BookInfo) => {
  selectBook.value.id = data.id;
  selectBook.value.author = data.author;
  selectBook.value.title = data.title;
  selectBook.value.isbn = data.isbn;
  selectBook.value.description = data.description;
  selectBook.value.publicationDate = data.publicationDate;
  actionMode.value = ActionMode.EDIT;
  // router.push({ name: 'BookDetail', params: { id } });
};

// const openModal = (bookId = '') => {
//   if (bookId === '') {
//     console.log();
//   } else {
//     console.log();
//   }
// };
</script>

<style lang="sass" scoped>
$min-bilateral-distance: 25px
$bilateral-distance: 2.08%

$min-book-distance: 35px
$book-distance: 2.9%

.list
  display: flex
  flex-flow: row wrap
.book
  display: flex
  flex-flow: row nowrap
  width: 360px
  height: 160px
  // width: calc(max(360px, 30%))
  // height: calc(max(160px, 25%))
  margin-right: calc(max(35px, 2.9%))
  margin-top: 19px
  overflow: hidden
  border: 2px solid #DDD
  border-radius: 4px
  padding: 8px
  .book__img
    cursor: pointer
    width: 160px
    height: 160px
  .book__content
    .book__content__title
</style>
