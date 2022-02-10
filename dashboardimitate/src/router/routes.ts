import { RouteRecordRaw } from 'vue-router'
import error from '../views/error.vue'
import mainRoutes from './main-routes'

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      // 页面tab页的标题
      title: '登陆页面'
    }
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'common' */ '../layout/index.vue'),
    children: mainRoutes
  },
  {
    name: 'not-found',
    path: '/*',
    component: error
  }
]

export default routes
