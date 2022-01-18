<template>
  <n-layout-content class="l-layout-content" bordered>
    <router-view />
  </n-layout-content>
</template>

<script  lang= 'ts' setup>
</script>

<style lang="scss" scoped>
.l-layout-content{
  min-height: calc(100vh - 114px);
  padding: 10px 10px 10px 16px;
  background-size: 100%;
  background: linear-gradient(rgb(255, 255, 255,0.8), rgb(255, 255, 255,0.8)), url('src/assets/bg-girl.jpeg') no-repeat 0% 20%/ cover;
}
</style>
