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

function renderIcon (icon:any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const inverted = ref(false);
const collapsed= ref(false);

const menuOptions = [
  {
    label: '首页',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '总览',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '数据总览',
        key: 'pinball-1973-datasource'
      },
      {
        label: '升级日志',
        key: 'pinball-1973-update'
      }
    ]
  },
  {
    label: '商品',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '商品列表',
        key: 'a-wild-sheep-chase-thing'
      },
      {
        label: '商品分类',
        key: 'a-wild-sheep-chase-type'
      },
      {
        label: '集团分组',
        key: 'a-wild-sheep-chase-group'
      },
      {
        label: '回收站',
        key: 'a-wild-sheep-chase-laji'
      },
      {
        label: '商品标签',
        key: 'a-wild-sheep-chase-tag'
      }
    ]
  },
  {
    label: '订单',
    key: 'order',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '订单管理',
        key: 'order-manager',
      },
      {
        label: '评价管理',
        key: 'order-later',
      },
      {
        label: '订单配送',
        key: 'order-translate',
      }
    ]
  },
  {
    label: '设置',
    key: 'setting',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '权限设置',
        key: 'setting-authority',
      },
      {
        label: '应用基本设置',
        key: 'setting-base',
      },
      {
        label: '地址库',
        key: 'setting-address',
      }
    ]
  },
  {
    label: '操作记录',
    key: 'oprate',
    icon: renderIcon(BookIcon),
  }
]

</script>
