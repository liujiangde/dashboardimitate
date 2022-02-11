<template>
  <n-layout-header bordered
    class = 'l-layout-header'>
    <n-space justify="space-around" class="l-account-position">
      <n-icon size="20" >
        <FolderOpenSharp @click="$store.commit('setSollapsed',!$store.state.isSollapsed)" />
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
      <n-button  text @click="dang">
        <n-icon size="20" :depth="2" ><Albums /></n-icon>
      </n-button>
      <n-button  text @click="dang">
        <n-icon size="20" :depth="2"><Albums /></n-icon>
      </n-button>
      <n-button   text @click="dang">
        <img src="@/assets/account.svg" style="width:15px;height:15px;" alt="" srcset="">
      </n-button>
    </n-space>
  </n-layout-header>
</template>

<script  lang= 'ts' setup>
import { Albums, FolderOpenSharp } from '@vicons/ionicons5'
import { computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()
console.log(router.currentRoute.value.matched)
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
const dang = () => {
  console.log(location)
  alert('1')
}
</script>
<style lang="scss" scoped>
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
