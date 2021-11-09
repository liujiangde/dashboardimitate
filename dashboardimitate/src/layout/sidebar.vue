<template>
   <n-layout-sider
        :collapsed-width="120"
        :width="240"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
        collapse-mode="width"
        :native-scrollbar="false"
      >
      <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
</template>
<script lang= "ts"  setup >
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
const inverted = ref(false);
const collapsed= ref(false);

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
