<template lang="pug">
.wrapper
  EditPanel(v-model='editPanelIsOpen' :mode='ActionMode.EDIT' :bookFormData='bookFormData')
  .header
    .title The Book Shelf
    .create-button.button(@click="openEditPanel")
      p Edit
  .content
    | {{bookFormData}}
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, PropType } from 'vue';
import api, { BookInfo, EditBookReq, BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import { useBookStore } from '@/store/bookInfo';
import EditPanel from '@/views/BookShelf/EditPanel.vue';

const bookStore = useBookStore();

const editPanelIsOpen = ref<boolean>(false);

const bookFormData = ref<BookFormData>({
  id: '',
  author: '',
  description: '',
  isbn: '',
  publicationDate: '',
  title: ''
} as BookFormData);

const openEditPanel = () => {
  editPanelIsOpen.value = true;
};

onMounted(() => {
  bookFormData.value = bookStore.BookFormData;
});
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
