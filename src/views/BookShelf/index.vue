<template lang="pug">
.wrapper
  .header
    .title The Book Shelf
    .create-button.button(@click="nextPage")
      p create
  .content
    .list
      EditPanel(v-model='editPanelIsOpen' :mode='ActionMode.ADD')
      .book(v-for='bookItem in bookList' :key='bookItem.id') 
        .book__img(@click='displayDetail(bookItem)')
        .book__content
          .book__content__title {{bookItem.title}}
          .book__content__author {{bookItem.author}}
      Observer(:rootSelector="'.list'" :handleIntersect='nextPage')
</template>

<script setup lang="ts">
import { Router, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import api, { BookInfo, EditBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import EditPanel from './EditPanel.vue';
import Observer from '@/components/Observer/index.vue';
import getBookList from './composables/getBookList';

import { useBookStore } from '@/store/bookInfo';
const { bookList, nextPage } = getBookList();

const bookStore = useBookStore();

const router: Router = useRouter();

// const bookList = ref<Array<BookInfo>>([]);

const editPanelIsOpen = ref<boolean>(false);

const displayDetail = (data: BookInfo) => {
  let bookData: BookFormData = {
    id: data.id,
    author: data.author,
    title: data.title,
    isbn: data.isbn,
    description: data.description,
    publicationDate: data.publicationDate
  };
  bookStore.setBookFormData(bookData);
  router.push({
    name: 'BookDetail'
  });
};

const openCreatePanel = () => {
  editPanelIsOpen.value = true;
};
</script>

<style lang="sass" scoped>
$min-bilateral-distance: 25px
$bilateral-distance: 2.08%

$min-book-distance: 35px
$book-distance: 2.9%

.wrapper
  height: 100%
  width: 100%
  .header
    position: relative
    height: 60px
    width: 100%
    border-bottom: 2px solid rgba(180, 180, 180,1 )
    .title
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    .create-button
      position: absolute
      top: 50%
      right: 16px
      transform: translate(0, -50%)
      width: 70px
      height: 28px

  .content
    height: calc(100% - 60px)
    width: 100%
    .list
      height: 100%
      width: 100%
      overflow: auto
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
