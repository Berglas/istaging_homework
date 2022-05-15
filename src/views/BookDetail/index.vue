<template lang="pug">
.wrapper
  EditPanel(v-model='editPanelIsOpen' :mode='ActionMode.EDIT' :bookFormData='bookFormData')
  .header
    .title {{bookFormData.title}}
    .back-button(@click='back')
    .edit-button(@click="openEditPanel")
  .content
    .book
      img.book__img(src='https://picsum.photos/800/600')
      .book__content
        .book__content__title {{bookFormData.title}}
        .book__content__author {{bookFormData.author}}
        .book__content__publicationDate Published on {{formatTime(bookFormData.publicationDate)}}
        .book__content__description {{bookFormData.description}}
        .book__content__isbn ISBN：{{bookFormData.isbn}}
</template>

<script setup lang="ts">
import { Router, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import type { BookFormData } from '@/api/book';
import { ActionMode } from '@/typeCollect/common';
import { useBookStore } from '@/store/bookInfo';
import EditPanel from '@/views/BookShelf/EditPanel.vue';
import { formatTime } from '@/utils/format';
const router: Router = useRouter();

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

const back = () => {
  router.push({ name: 'BookShelf' });
};

const openEditPanel = () => {
  editPanelIsOpen.value = true;
};

onMounted(() => {
  bookFormData.value = bookStore.BookFormData;
});
</script>

<style lang="sass" scoped>
.wrapper
  height: 100%
  width: 100%
  .header
    position: relative
    height: 60px
    width: 100%
    background-color: rgba(177,120,68, .4)
    border-bottom: 2px solid rgba(180, 180, 180,1 )
    .title
      position: absolute
      width: calc(100% - 6.4rem)
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      text-align: center
      @include phone-screen
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    .back-button
      position: absolute
      top: 50%
      left: 1rem
      transform: translate(0, -50%)
      height: 1.6rem
      width: 1.6rem
      z-index: 5000
      cursor: pointer
      &:after
        mask: url('~@/assets/angle-left.svg') no-repeat 50% 50%
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
    .edit-button
      position: absolute
      top: 50%
      right: 1rem
      transform: translate(0, -50%)
      height: 1.6rem
      width: 1.6rem
      z-index: 5000
      cursor: pointer
      &:after
        mask: url('~@/assets/edit.svg') no-repeat 50% 50%
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
  .content
    height: calc(100% - 60px)
    width: 100%
    background-color: rgba(177,120,68, .15)
    display: flex
    flex-flow: row nowrap
    justify-content: center
    .book
      display: flex
      padding-top: 30px
      width: 50%
      height: 50%
      align-items: start
      @include phone-screen
        width: 100%
        height: 100%
        padding-top: 19px
        align-items: center
        flex-flow: column wrap
      .book__img
        position: relative
        cursor: pointer
        width: 160px
        height: 160px
        z-index: 3000
        border: 1px solid #ddd
        border-radius: 4px
        @include phone-screen
          width: 250px
          height: 250px
      .book__content
        width: calc(100% - 160px)
        display: flex
        flex-flow: column nowrap
        justify-content: center
        align-items: center
        padding-left: 22px
        @include phone-screen
          width: 100%
        .book__content__title
          width: 100%
          font-weight: 400
          font-size: 1.5rem
          line-height: 1.75rem
        .book__content__author
          font-size: 1.125rem
          line-height: 1.125rem
          margin-top: 7px
          width: 100%
          color: #6B6B6B
        .book__content__publicationDate
          font-size: 1.125rem
          line-height: 1.125rem
          width: 100%
          margin-top: 14px
        .book__content__description
          font-size: 1rem
          line-height: 1.125rem
          width: 100%
          margin-top: 16px
        .book__content__isbn
          font-size: 1rem
          line-height: 1.125rem
          width: 100%
          margin-top: 24px
          color: #6B6B6B
</style>
