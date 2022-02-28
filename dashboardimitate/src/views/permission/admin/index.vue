<!--管理员  -->
<template>
<el-table :data="tableData"  style="width: 100%">
    <el-table-column prop="id"  fixed="left" label="ID" width="180" />
    <el-table-column prop="name"  fixed="left" label="姓名" width="180" />
    <el-table-column prop="account"  fixed="left" label="账号"  width="180"  />
    <el-table-column prop="role" label="身份"  width="180"  />
    <el-table-column prop="lastTime" label="最后一次登陆时间"  width="250" />
    <el-table-column prop="lastIP" label="最后一次登陆IP"   width="180" />
    <el-table-column prop="status" label="状态"  >
      <template>
        <el-switch
          v-model="value"
          class="ml-2"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </template>
    </el-table-column>

    <el-table-column  fixed="right"  width="150" label="操作">
      <template  #default="scope">
        <n-space>
           <el-button
              type="text"
              size="small"
              @click='editButt(scope.id)'
            >
              编辑
          </el-button>
          <el-button
              type="text"
              size="small"
            >
              删除
          </el-button>
        </n-space>

      </template>

    </el-table-column>
  </el-table></template>
<script lang='ts' setup >
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action } from 'element-plus'
import { ref } from 'vue'

const value = ref(true)

const editButt = (id) => {
  ElMessageBox.confirm(
    '这可是管理员账号哦，请不要随便编辑哈',
    '确认',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )
    .then(() => {
      ElMessage({
        type: 'info',
        message: '改？上哪改？表单都没做，哈哈哈'
      })
    })
    .catch((action: Action) => {
      ElMessage({
        type: 'info',
        message:
          action === 'cancel'
            ? '取消了？好的'
            : '发生了啥？'
      })
    })
}
const tableData = [
  {
    id: '2016-05-03',
    name: 'Tom',
    account: '19228921029',
    role: '未知',
    lastTime: '2022.03.04',
    lastIP: '10.114.102.10',
    status: 0
  }

]
</script>
<style lang='scss' scoped>
</style>
