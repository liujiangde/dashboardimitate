import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import naive from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(naive)
app.mount('#app')
