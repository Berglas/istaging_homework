<template lang="pug">
.list
  | {{ $route.params.id }}
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api, { BookInfo, EditBookReq } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';

const bookList = ref<Array<BookInfo>>([]);

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
    width: 160px
    height: 160px
  .book__content
    .book__content__title
</style>
