/* eslint-disable no-unused-vars */
<!-- 登陆模块 -->
<template>
<div class="container">
    <div class="login-contain">
      <n-form
        label-placement="left"
        label-width="auto"
        ref="formRef" >
        <n-form-item path="name" label="姓名">
         <n-input
          value=""
          @keydown.enter.prevent
          placeholder="请输入姓名"
          />
        </n-form-item>
         <n-form-item label="密码" path="password">
          <n-input
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="验证码" path="vertify">
          <n-input
            placeholder="请输入验证码"
          />
          <img class="img-contain"
          :src="imgSrc"
          alt=""
          srcset="">
        </n-form-item>
          <n-button type="success">
            登陆
          </n-button>
      </n-form>
    </div>
</div>

</template>

<script lang='ts' setup >
// eslint-disable-next-line no-unused-vars
import { getVertifyCode, getLoginInfo } from '@/api/common'
// eslint-disable-next-line no-unused-vars
import { ILoginInfo } from '@/api/types/common'
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref } from 'vue'

// const state = reactive({
//   imgdata: ''
// })
// const a = ref<ILoginInfo['slide']>([])

const imgSrc = ref('')

const getVertify = async () => {
  const resp = await getVertifyCode()
  imgSrc.value = URL.createObjectURL(resp)
}

onMounted(() => {
  // getLoginInfo().then(res => {
  //   a.value = res.slide
  // })
  getVertify()
  getVertifyCode().then(res => {

  })
})

</script>
<style scoped lang="scss">
.container{
  width: 100vw;
  height: 100vh;
  background-color: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-contain{
    width: 400px;
    height: 300px;
    background: #fff;
    padding: 30px 30px;
    border-radius: 6px;
  }
  .img-contain{
    margin-left: 20px;
    width: 106px;
    height: 33px;
  }
}

</style>
