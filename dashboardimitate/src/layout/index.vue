<template>
  <n-space vertical size="large">
    <n-layout position='absolute' has-sider>
      <Sidebar />
      <n-layout-content content-style="padding: 0px 20px">
        <Header />
        <Content />
        <Footer />
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import Header from './header-layout.vue'
import Footer from './footer-layout.vue'
import Content from './content-layout.vue'
import Sidebar from './sidebar.vue'
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

</script>

<style lang="scss">
@import '../theme';

</style>
