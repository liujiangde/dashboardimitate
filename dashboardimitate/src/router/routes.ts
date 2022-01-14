
import login from '../views/login.vue'
import error from '../views/error.vue'
import mainRoutes from './main-routes'

export default [
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: 'Sign In'
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
  },
]
