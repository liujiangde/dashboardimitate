/* eslint-disable no-unused-vars */
<!-- 登陆模块 -->
<template>
<div class="container">
    <div class="login-contain">
      <n-form
        label-placement="left"
        :label-width="80"
        :model="state.formValue"
        size="medium"
        :rules="state.rules"
        ref="formRef" >
        <n-form-item path="name" label="姓名">
         <n-input
          v-model:value="state.formValue.user.name"
          @keydown.enter.prevent
          placeholder="请输入姓名"
          />

        </n-form-item>
         <n-form-item label="密码" path="password">
          <n-input
          v-model:value="state.formValue.user.password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="验证码" path="vertify">
          <n-input
            v-model:value="state.formValue.user.vertify"
            placeholder="请输入验证码"
          />
          <img class="img-contain"
          :src="imgSrc"
          alt=""
          srcset="">
        </n-form-item>
          <n-button type="success" @click="handleValidateClick"  attr-type="button">
            登陆
          </n-button>
      </n-form>
    </div>
</div>

</template>

<script lang='ts' setup >
import { getVertifyCode, getLoginInfo } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { useMessage } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue'
const message = useMessage()

const formRef = ref()
const imgSrc = ref('')

const state = reactive({
  size: 'medium',
  formValue: {
    user: {
      name: '',
      password: '',
      vertify: ''
    }
  },
  rules: {
    user: {
      name: {
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
      },
      password: {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur']
      },
      vertify: {
        required: true,
        message: '请输入验证码',
        trigger: ['input', 'blur']
      }
    }
  }
})

const getVertify = async () => {
  const resp = await getVertifyCode()
  imgSrc.value = URL.createObjectURL(resp)
}

const handleValidateClick = (e) => {
  e.preventDefault()
  const messageReactive = message.loading('Verifying', {
    duration: 0
  })
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('成功')
    } else {
      message.error('失败')
      console.log('errors', errors)
    }
    messageReactive.destroy()
  })
}
onMounted(() => {
  getVertify()
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
