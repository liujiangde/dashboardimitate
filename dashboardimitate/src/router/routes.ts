
import login from '../views/login.vue'
import error from '../views/error.vue'
import mainRoutes from './main-routes'
import demoRoutes from './demo-routes'



export default [
  {
    name: 'login',
    path: '/login',
    component: login
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
  },
]
