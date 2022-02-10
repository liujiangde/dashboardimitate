<template>
  <n-layout-header bordered
    class = 'l-layout-header'>
    <n-breadcrumb>
      <n-breadcrumb-item href="/#/layout/update">
        <n-icon><Albums /></n-icon>
        home
      </n-breadcrumb-item>
      <n-breadcrumb-item href="/">
        <n-icon><Albums /></n-icon>da
      </n-breadcrumb-item>
      <n-breadcrumb-item href="#">
        <n-icon><Albums /></n-icon>hs
      </n-breadcrumb-item>
    </n-breadcrumb>
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
import { Albums } from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route, router)

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
