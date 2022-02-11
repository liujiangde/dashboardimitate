<template>
  <h1>达摩</h1>
  <p>项目介绍：无</p>
  <p>项目技术栈：ts vite vue3 vue-router naive-ui sass。</p>
  <span>
    {
    // 默认配置
    "git.ignoreMissingGitWarning": true,
    "editor.fontSize": 13,
    // "editor.wordWrap": "on",
    "editor.fontFamily": "Fira Code",
    "terminal.integrated.fontFamily": "monospace",
    // tab 大小为2个空格
    "editor.tabSize": 4,
    // 100 列后换行
    "editor.wordWrapColumn": 100,
    // 保存时格式化
    "editor.formatOnSave": false,
    // 开启 vscode 文件路径导航
    "breadcrumbs.enabled": true,
    // prettier 设置语句末尾不加分号
    "prettier.semi": false,
    // prettier 设置强制单引号
    "prettier.singleQuote": true,
    // 选择 vue 文件中 template 的格式化工具
    "vetur.format.defaultFormatter.html": "prettyhtml",
    // 显示 markdown 中英文切换时产生的特殊字符
    "editor.renderControlCharacters": true,
    // 设置 eslint 保存时自动修复
    // "eslint.autoFixOnSave": true,
    // eslint 检测文件类型
    // "eslint.validate": [
    //   "javascript",
    //   "javascriptreact",
    //   {
    //     "language": "html",
    //     "autoFix": false
    //   },
    //   {
    //     "language": "vue",
    //     "autoFix": true
    //   }
    // ],
    // vetur 的自定义设置
    // "vetur.format.defaultFormatterOptions": {
    //   "prettier": {
    //     "singleQuote": true,
    //     "semi": false
    //   }
    // },
    // "workbench.iconTheme": "material-icon-theme",
    "sync.gist": "eafbdbac1d5a22c6879e318ca74ae3a5",
    "explorer.confirmDelete": false,
    "sync.forceUpload": true,
    "window.zoomLevel": 1,
    "fileheader.customMade": {    //此为头部注释
      "Description": "new file",
      "Autor": "liu",
      "Date": "Do not edit",
      "LastEditors": "zhan",
      "LastEditTime": "Do not edit"
    },
  "fileheader.cursorMode": {  //此为函数注释
      "description":"",
      "param": "",
      "return": "",
      "author":"liu"
    },
    "backgroundCover.imagePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568705166&di=54fe032a482d9768e3694a525d501470&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F08%2F2018050884403_CVAr5.jpeg",
    "backgroundCover.opacity": 0.4,
    "explorer.confirmDragAndDrop": false,
    "terminal.integrated.rendererType": "dom",
    "editor.quickSuggestions": {
      "strings": true
    },
    "git.enableSmartCommit": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "[html]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": false
      }
    },
    "diffEditor.ignoreTrimWhitespace": false,
    "git.autofetch": true,
    "editor.inlineSuggest.enabled": true,
    "github.copilot.enable": {
      "*": false,
      "yaml": false,
      "plaintext": true,
      "markdown": false
    },
    "volar.icon.finder": true,
    "volar.icon.splitEditors": false,
    "volar.formatting.printWidth": 130,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
    "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
    "eslint.format.enable": true,
    "[vue]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "explorer.compactFolders": false
  }

  </span>
  <div>{{ count }}</div>
    <!-- 还是可以拿到state数据 -->
  <div>{{ $store.state.count }}</div>
  <n-button  @click=" handleButtonClick">
    留下足迹
  </n-button>
  <p>记录列表</p>
  <n-space vertical :size="12">
    <!-- <n-data-table
      ref="dataTableInstRef"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      /> -->
  </n-space>
  <!-- <AddUserAccountVue :dialogFormVisible = state.dialogFormVisible /> -->
</template>

<script lang="ts" setup>
import { h, computed, reactive, onMounted, toRefs, nextTick, ref, defineComponent } from 'vue'
import { useStore } from '../store/index'

import { useDialog } from 'naive-ui'
const store = useStore()
const count = store.state.count
const state = reactive({
  dialogFormVisible: false
})
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

      interface TableInfo {
        key: number,
        name: String,
        age: number,
        job: String,
        gender: String,
        technologyStack: String,
        email: String
      }

const formLabelWidth = '120px'
// TODO:打开弹框
const handleButtonClick = () => {
  state.dialogFormVisible = !state.dialogFormVisible
}

interface ColumnsLIst {
    title: string,
    key: string,
}

const columns = [
  {
    title: '名字',
    key: 'name'
  },
  {
    title: '年龄',
    key: 'age',
    sorter: (a:TableInfo, b:TableInfo) => a.age - b.age
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
    render: (rowData:TableInfo) => { return rowData.job === 'frontend' ? '前端' : '后端' },

    filter (value:String, row:TableInfo) {
      return row.job === value ? -1 : 0
    }
  },
  {
    title: '性别',
    defaultSortOrder: false,
    key: 'gender',
    render: (rowData:TableInfo) => { return rowData.gender === 'male' ? '男' : '女' },
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
    filter (value:String, row:TableInfo) {
      return row.gender === value ? -1 : 0
    }
  },
  {
    title: '技术栈',
    defaultSortOrder: false,
    key: 'technologyStack'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '工作地',
    key: 'workPosition'
  }
]
const pagination = ref({ pageSize: 5 })

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
