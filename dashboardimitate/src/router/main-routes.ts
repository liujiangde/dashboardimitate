// import Home from '../views/home'
// import Update from '../views/'

// meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。

export default [
  {
    name: 'defult',
    path: '/',
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/home.vue')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('../views/home.vue')
  },
  {
    name: 'update',
    path: '/update',
    component: () => import('../views/update.vue')
  },
  {
    name: 'overview',
    path: '/overview',
    component: () => import('../views/update.vue')
  },
]
