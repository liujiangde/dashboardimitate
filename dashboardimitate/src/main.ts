import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import naive from 'naive-ui'
import { store, key } from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { GaodeMapV2 } from '@antv/l7-maps' // 默认引入高德2.0 版本
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store, key)
app.use(naive)
app.mount('#app')
