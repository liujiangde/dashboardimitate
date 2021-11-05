// import Home from '../views/home'
// import Update from '../views/'

// meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。


export default [
  {
    name: 'update',
    path: '/update',
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/update.vue')
  },
  {
    name: 'layout',
    path: '/layout/',
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/update.vue')
  },
  {
    name: 'layout',
    path: '/layout/update',
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/update.vue')
  },
  {
    name: 'layout1',
    path: '/layout/home',
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/home.vue')
  },

]
