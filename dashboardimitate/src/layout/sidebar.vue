<template>
   <n-layout-sider
        :collapsed-width="120"
        :width="240"
        content-style="padding: 24px;"
        bordered
        :collapsed="store.state.isSollapsed"
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
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from '@/store/index'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon:any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const store = useStore()

const menuOptions = [
  {
    // label: '首页',
    label: () => h(RouterLink, { to: '/home' }, { default: () => '首页' }),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '瞎搞1',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        // label: '数据总览',
        label: () => h(RouterLink, { to: '/datasource' }, { default: () => '搞搞高德' }),
        key: 'pinball-1973-datasource'
      },
      {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/update' }, { default: () => '微博梭柯特' }),
        key: 'pinball-1973-update'
      },
      {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/three' }, { default: () => 'three' }),
        key: 'pinball-1973-three'
      }
    ]
  },
  {
    label: '商品',
    key: 'product',
    icon: renderIcon(WineIcon),
    children: [
      {
        // label: '数据总览',
        label: () => h(RouterLink, { to: '/product/list' }, { default: () => '商品列表' }),
        key: 'product_list'
      },
      {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/product/classify' }, { default: () => '商品分类' }),
        key: 'product_classity'
      },
      {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/product/add' }, { default: () => '添加商品' }),
        key: 'product_add'
      },
      {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/product/attr' }, { default: () => '商品规格' }),
        key: 'product_attr'
      }, {
        // label: '升级日志',
        label: () => h(RouterLink, { to: '/product/reply' }, { default: () => '商品评论' }),
        key: 'product_reply'
      }
    ]
  },
  {
    label: '权限管理',
    key: 'system_power',
    icon: renderIcon(WineIcon),
    children: [
      {
        // label: '数据总览',
        label: () => h(RouterLink, { to: '/system_admin/index' }, { default: () => '管理员设置' }),
        key: 'system_admin'
      }
    ]
  }

]

</script>
