
import login from '../views/login.vue'
import error from '../views/error.vue'
// business routes
import mainRoutes from './main-routes'
// demo routes
import demoRoutes from './demo-routes'



export default [
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'common' */ '../views/layout.vue'),
    children: mainRoutes.concat(demoRoutes)
  },
  {
    name: 'not-found',
    path: '/*',
    component: error
  },
]
