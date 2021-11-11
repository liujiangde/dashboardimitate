<template>
  <n-dialog
      title="确认"
      content="你确定"
      :closable="false"
      negative-text="不确认"
      positive-text="确认"
      v-model="dialogTableVisible"
      @positive-click="handlePositiveClick"
      @negative-click="handleNegativeClick"
    />
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
const dialogTableVisible = false
const  handleNegativeClick = () => {
  }
const  handlePositiveClick = () =>  {
  }
</script>

<style scoped>

</style>
