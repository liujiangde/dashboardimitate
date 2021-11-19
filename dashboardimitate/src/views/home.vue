<template>
  <h1>达摩</h1>
  <p>项目介绍：</p>
  <p>这是一个用于平时练习的项目，将新学到的技术用上。项目技术栈：ts vite vue3 vue-router naive-ui sass。</p>

  <n-button  @click=" handleButtonClick">
    留下足迹
  </n-button>
  <p>记录列表</p>
  <n-space vertical :size="12">
    <n-data-table
      ref="dataTableInstRef"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      />
  </n-space>
  <AddUserAccountVue :dialogFormVisible = state.dialogFormVisible />
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRefs, nextTick, ref,  defineComponent} from 'vue'
import { useDialog } from 'naive-ui'
import  AddUserAccountVue  from './home/addUserAccount.vue'
const state = reactive({
  dialogFormVisible: false
})
const  form = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      };
const   formLabelWidth= '120px';
// TODO:打开弹框
const handleButtonClick = () => {
    state.dialogFormVisible = !state.dialogFormVisible
}

const columns = [
  {
    title: '名字',
    key: 'name'
  },
  {
    title: '年龄',
    key: 'age',
    sorter:  (a, b) => a.age - b.age,
  },
  {
    title: '职业',
    key: 'job',
    defaultSortOrder: false,
    filterOptions: [
      {
        label: '前端',
        value: 'frontend'
      },
      {
        label: '后端',
        value: 'rearend'
      }
    ],
    render: (rowData) => { return rowData['job'] === 'frontend' ? '前端' : '后端'},

    filter (value, row) {
      return row.job === value ? -1 : 0
    }
  },
  {
    title: '性别',
    defaultSortOrder: false,
    key: 'gender',
    render: (rowData:{}) => { return rowData['gender'] === 'male' ? '男' : '女'},
    filterOptions: [
      {
        label: '男',
        value: 'male'
      },
      {
        label: '女',
        value: 'famale'
      }
    ],
    filter (value:String, row:Object) {
      return row.gender === value ? -1 : 0
    }
  },
  {
    title: '技术栈',
    defaultSortOrder: false,
    key: 'technologyStack',
  },
  {
    title: '邮箱',
    key: 'email',
  },
  {
    title: '工作地',
    key: 'workPosition',
  }
]
const pagination = ref({ pageSize: 5 });


const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    job: 'frontend',
    gender: 'male',
    technologyStack: 'vue',
    email: ''
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    job: 'frontend',
    gender: 'male',
    technologyStack: 'react',
    email: ''
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    job: 'frontend',
    gender: 'famale',
    technologyStack: 'react',
    email: ''
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    job: 'frontend',
    gender: 'famale',
    technologyStack: 'vue',
    email: ''
  }
]

</script>



<style scoped>

</style>
