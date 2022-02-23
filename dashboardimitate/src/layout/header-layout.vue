<template>
  <n-layout-header bordered
    class = 'l-layout-header'>
    <n-space justify="space-around" class="l-account-position">
      <n-icon size="20" >
        <FolderOpenSharp @click="store.commit('setSollapsed',!store.state.isSollapsed)" />
      </n-icon>
      <n-breadcrumb>
      <n-breadcrumb-item
        v-for="item in routes"
        :key="item.path"
      >
      {{  item.meta.title }}
      </n-breadcrumb-item>

    </n-breadcrumb>
    </n-space>
    <n-space justify="space-around" class="l-account-position">
      <n-button  text >
        <n-icon size="20" :depth="2" ><Albums /></n-icon>
      </n-button>
      <n-button  text @click="toggleFullScreen">
        <n-icon size="20" :depth="2"><Albums /></n-icon>
        {{ flag? "全屏": "退出全屏"}}
      </n-button>
      <!-- <n-button text>
        <img src="@/assets/account.svg" style="width:15px;height:15px;" alt="" srcset="">
      </n-button> -->
      <el-dropdown :hide-on-click="false" class="dropdown-style">
        <span class="el-dropdown-link">
          {{ store.state.user?.account }}
          <!-- <el-icon class="el-icon--right"><arrow-down /></el-icon> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="exitAcc">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <LogoutDialog /> -->
    </n-space>
  </n-layout-header>
</template>

<script  lang= 'ts' setup>
import { Albums, FolderOpenSharp } from '@vicons/ionicons5'
import LogoutDialog from './dialog-logout/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action } from 'element-plus'
import { useMessage, useDialog } from 'naive-ui'
import { removeItem } from '@/utils/storage.ts'
import { computed, ref } from 'vue'
import { USER } from '@/utils/constpool'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { login, logout } from '@/api/common'
const store = useStore()
const router = useRouter()
const route = useRoute()
const flag = ref<Boolean>(true)
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

const exitAcc = async () => {
  ElMessageBox.confirm(
    '确认退出吗',
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      customClass: 'logout-exitAcc-comform'
    }
  )
    .then(async () => {
      await logout()
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      // 跳转回原来页面
      let redirect = route.query.redirect
      if (typeof redirect !== 'string') {
        redirect = '/login'
      }
      removeItem(USER)
      store.commit('setUser', null)
      router.replace(redirect)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    flag.value = false
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      flag.value = true
    }
  }
}
</script>
<style lang="scss" scoped>

  .dropdown-style{
    line-height: normal;
  }
.l-layout-header{
    position: sticky;
    top: 0;
    z-index: 1;
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  .l-account-position{
    height: auto;

  }
  .l-account-position :last-child{
    padding-top: -2px;
  }
</style>
