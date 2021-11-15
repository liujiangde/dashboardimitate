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
  import Header from "./header.vue";
  import Footer from "./footer.vue";
  import Content from "./content.vue";
  import Sidebar from "./sidebar.vue";
  import { h,ref } from 'vue'
  import { NIcon } from 'naive-ui'
  import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

  function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '没意义的选项1',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '没意义的选项2',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '选项没意义的选项2-1',
        key: 'rat'
      }
    ]
  },
  {
    label: '没意义的选项3',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon)
  },
  {
    label: '没意义的选项4',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        // type: 'group',
        label: '没意义的选项4-1',
        key: 'people',
        children: [
          {
            label: '没意义的选项4-1',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '4-1',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '没意义的选项5',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '没意义的选项5-1',
            key: 'whisky'
          }
        ]
      },
      {
        label: '没意义的选项6',
        key: 'food',
        children: [
          {
            label: '没意义的选项6-1',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '没意义的选项7',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
</script>

<style lang="scss">
@import '../theme';

</style>
