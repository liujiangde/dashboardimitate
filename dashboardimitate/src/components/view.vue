<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import router from '../router/index.vue'

const useLoading =  useLoadingBar()

</script>
