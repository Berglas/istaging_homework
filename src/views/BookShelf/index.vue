<template lang="pug">
.wrapper
  .header
    .title The Book Shelf
    .create-button(@click="openCreatePanel")
  .content
    .list
      EditPanel(v-model='editPanelIsOpen' :mode='ActionMode.ADD')
      .book(v-for='(bookItem, index) in bookList' :key='bookItem.id')
        a(:href='`#${index}`')
        img.book__img(@click='goToDetail(bookItem)' src='https://picsum.photos/800/600')
        .book__content
          .book__content__title {{bookItem.title}}
          .book__content__author {{bookItem.author}}
      Observer(:rootSelector="'.content'" :handleIntersect='nextPage' :showLoading="hasNextPage")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ActionMode } from '@/typeCollect/common';
import EditPanel from './EditPanel.vue';
import Observer from '@/components/Observer/index.vue';
import getBookList from './composables/getBookList';
import editPanel from './composables/editPanel';

const { bookList, nextPage, hasNextPage } = getBookList();
const { goToDetail } = editPanel();

const editPanelIsOpen = ref<boolean>(false);

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
    background-color: rgba(177,120,68, .4)
    border-bottom: 2px solid rgba(180, 180, 180,1 )
    .title
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    .create-button
      position: absolute
      top: 50%
      right: 1rem
      transform: translate(0, -50%)
      height: 1.6rem
      width: 1.6rem
      z-index: 5000
      cursor: pointer
      &:after
        mask: url('~@/assets/plus.svg') no-repeat 50% 50%
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
    padding: 18px 7.5px 0 7.5px
    overflow: auto
    @include phone-screen
      padding: 18px 8px 0 8px
    .list
      height: 100%
      width: 100%
      display: flex
      flex-flow: row wrap
      justify-content: flex-start
    .book
      display: flex
      flex-flow: row nowrap
      height: 160px
      width: calc(33% - 35px)
      margin: 0 17.5px 21px 17.5px
      overflow: hidden
      border: 2px solid rgba(188,188,188,1)
      border-radius: 4px
      @include phone-screen
        flex-flow: column nowrap
        width: calc(50% - 12px)
        margin: 0 6px 12px 6px
        height: 250px
      .book__img
        position: relative
        cursor: pointer
        width: 50%
        z-index: 3000
        &:after
          position: absolute
          top: 0
          left: 100%
          height: 100%
          width: 100%
          content: ''
          background: rgba(255, 0, 0, 0.5)
          z-index: 4000
        @include phone-screen
          width: 100%
          height: 160px
      .book__content
        width: 50%
        display: flex
        flex-flow: column nowrap
        justify-content: center
        align-items: center
        padding: 1.25rem
        @include phone-screen
           width: 100%
        .book__content__title
          width: 100%
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          display: inline-block
          font-weight: 400
          font-size: 1.5rem
          line-height: 1.75rem
          @include phone-screen
            font-size: 1.125rem
        .book__content__author
          font-size: 1.125rem
          line-height: 1.125rem
          width: 100%
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          margin-top: 5px
          color: #6B6B6B
          @include phone-screen
            font-size: 1rem
            width: 100%
</style>
