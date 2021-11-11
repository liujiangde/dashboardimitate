<template>
  <h1>达摩</h1>

  <p>项目介绍：</p>
  <p>这是一个用于平时练习的项目，将新学到的技术用上。项目技术栈：ts vite vue3 vue-router naive-ui sass。</p>

  <n-button  @click=" handleButtonClick">
    留下印记
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
  <el-dialog v-model= dialogFormVisible  title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai"></el-option>
          <el-option label="Zone No.2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { useDialog } from 'naive-ui'
let dialogFormVisible: Boolean = false
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
const handleButtonClick = () => {
    console.log(dialogFormVisible);
    console.log(this);

    dialogFormVisible = false
    console.log('2',dialogFormVisible);

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
