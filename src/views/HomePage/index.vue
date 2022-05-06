<template lang="pug">
.notify-manage-root
    | 123
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
</script>

<style lang="sass" scoped>
.input-select
  width: 100%
.panel, .unsend-panel
  overflow: auto
  .panel__text
    margin: 16px 0 4px 0
    .checkbox
      margin: 8px
  .panel__content
    .date-picker
      width: 100%
    .button
      width: 100%
      display: flex
      flex-flow: row nowrap
      justify-content: right
      margin-top: 2rem
.unsend-panel
  .panel__content
    .message1
      font-size: 1.5rem
    .message2
      color: #AAA
.username
  cursor: pointer
  font-weight: 600
  color: #409eff
.notify-manage-root
  .header-wrap
    display: flex
    align-items: center
    height: 50px
    padding: 0 15px
    background-color: #F3F3F3
    .header-wrap__title-block
      display: flex
      align-items: center

    .header-wrap__time
      margin-left: auto

  .search-bar-wrap
    height: 60px
    // border: solid #F3F3F3 1px
    position: relative
    display: flex
    flex-flow: row wrap
    align-items: center
    .add-btn
      position: absolute
      right: 16px
    .input-wrap__title
      margin-right: 1rem
    .input-wrap__el
      width: 120px
      margin-right: 1rem

    .search-bar-wrap__button-wrap__post-btn
      color: #FFF
  .table-wrap
    overflow: auto
  .table-wrap__title-bar
    display: flex
    align-items: center

  .table-wrap__title-bar__title
    display: flex
    align-items: center
    padding: 10px
    .table-wrap__title-bar__title__text
      margin-left: 5px

  .router-link-wrap
    display: flex
    align-items: center
    justify-content: space-between
    .el-link
      &:not(:last-child)
        margin-right: 10px

  .form-button-wrap
    display: flex
    justify-content: center
  .el-breadcrumb :deep(.el-breadcrumb__item)
      cursor: pointer

  .back-btn
    margin-right: 10px

  .cursor-pagination-root
    margin-top: 10px
    margin-left: auto
    margin-right: 30px
.type__item
  width: 4rem
  height: 1.5rem
  border-radius: 8px
  text-align: center
  color: #FFF
.disable
  background: rgba(236, 128, 141, 1)
  border-color: rgba(236, 128, 141, 1)
.enable
  background: rgba(128, 200, 141, 1)
  border-color: rgba(128, 200, 141, 1)
.stop
  background: #ACACAC
  border-color: #ACACAC
  cursor: not-allowed
.img-loader
  width: 200px
  height: 200px
  overflow: auto
</style>
