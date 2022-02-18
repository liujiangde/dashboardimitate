/* eslint-disable no-unused-vars */
<!-- 登陆模块 -->
<template>
<div class="container">
    <div class="login-contain">
        <n-form
         label-placement="left"
          :label-width="80"
          :model="formValue"
          size="medium"
          ref="formRef"
          :rules="state.user"
        >
        <n-form-item label="姓名" path="user.name">
          <n-input
          :rules="state.rules.user"
           v-model:value="formValue.user.name" placeholder="请输入姓名" />
        </n-form-item>
        <n-form-item
        :rules="state.rules.user.password" label="密码" path="user.password">
          <n-input
          placeholder="请输入密码" v-model:value="formValue.user.password" />
        </n-form-item>
        <!-- <n-form-item label="验证码" path="vertify">
          <n-input
            v-model:value="state.formValue.vertify"
            placeholder="请输入验证码"
          />
          <img class="img-contain"
          :src="imgSrc"
           @click="getVertify"
          alt=""
          srcset="">
        </n-form-item> -->
          <n-button type="success"  attr-type="submit">
            登陆
          </n-button>
      </n-form>

    </div>
</div>

</template>

<script lang='ts' setup >
import { getVertifyCode, getLoginInfo } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { useMessage, NFormItem } from 'naive-ui'
import { FormItemValidateOptions } from 'naive-ui/lib/form/src/interface'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

export type NForm = InstanceType<typeof NFormItem>

const message = useMessage()
const loading = ref(false)
const formRef = ref<NForm | null>(null)
const imgSrc = ref('')
const formValue = ref({
  user: {
    name: '',
    password: '',
    vertify: ''
  }
})
// 问题外面嵌套了一层user 会导致
// TypeError: Cannot read properties of undefined (reading 'user')

// const rules = ref({
//   user: {
//     name: {
//       required: true,
//       trigger: 'blur',
//       validator: (rule, value) => {
//         return new Promise((resolve, reject) => {
//           if (value !== 'testName') {
//             reject(Error('非正确名字')) // reject with error message
//           } else {
//             resolve('chenggogn')
//           }
//         })
//       }
//     },
//     password: {
//       required: true,
//       trigger: 'input',
//       validator: (rule, value) => {
//         return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             if (value <= 16) {
//               reject(Error('非正确年龄'))
//             } else {
//               resolve('chenggogn')
//             }
//           }, 3000)
//         })
//       }
//     }
//   }
// })
const state = reactive({
  size: 'medium',
  user: {
    required: true,
    trigger: 'blur',
    validator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value !== 'testName') {
          reject(Error('非正确名字')) // reject with error message
        } else {
          resolve()
        }
      })
    }
  },
  rules: {
    user: {
      name: {
        required: true,
        trigger: 'blur',
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (value !== 'testName') {
              reject(Error('非正确名字')) // reject with error message
            } else {
              resolve()
            }
          })
        }
      },
      password: {
        required: true,
        trigger: 'input',
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value <= 16) {
                reject(Error('非正确年龄'))
              } else {
                resolve()
              }
            }, 3000)
          })
        }
      }

    }
  }
})

const getVertify = async () => {
  const resp = await getVertifyCode()
  imgSrc.value = URL.createObjectURL(resp)
  console.log(resp.stream()
  )
}

const handleValidateClick = async () => {
  // const valid = await formRef.value?.validate()
  formRef.value?.validate((errors) => {
    debugger
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })

  loading.value = true
}
onMounted(() => {
  getVertify()
  console.log('formRef', formRef)
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
