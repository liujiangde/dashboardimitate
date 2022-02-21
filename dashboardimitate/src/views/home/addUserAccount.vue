<template>

</template>

<script setup lang="ts">
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { useMessage } from 'naive-ui'

const props = defineProps({
  dialogFormVisible: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  ruleForm: {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  },
  rules: {
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur'
      }
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change'
      }
    ],
    date1: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change'
      }
    ],
    date2: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change'
      }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change'
      }
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change'
      }
    ],
    desc: [
      {
        required: true,
        message: 'Please input activity form',
        trigger: 'blur'
      }
    ]
  }
}
)
// const submitForm = (formName) => {
//   this.$refs[formName].validate((valid) => {
//         if (valid) {
//           alert('submit!')
//         } else {
//           return false
//         }
//       })
//     }
// const resetForm = (formName) => {
//   this.$refs[formName].resetFields()
// }

const form = {
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
}
const formLabelWidth = '120px'
</script>

<style scoped>

</style>
