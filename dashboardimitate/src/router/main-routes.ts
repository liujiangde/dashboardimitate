// import Home from '../views/home'
// import Update from '../views/'

import { RouteRecordRaw, RouterView } from 'vue-router'

// meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。

const testroutes: RouteRecordRaw[] = [
  {
    name: 'defult',
    path: '/',
    meta: {
      title: '家'
    },
    // meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    // requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // meta: { requireAuth: true },
    component: () => import('../views/home.vue')
  },
  {
    name: 'home',
    path: '/home',
    meta: {
      title: '家'
    },
    component: () => import('@/views/home.vue')
  },
  {
    name: 'update',
    meta: {
      title: 'websocket'
    },
    path: '/update',

    component: () => import('@/views/update.vue')
  },
  {
    name: 'overview',
    path: '/overview',
    component: () => import('@/views/update.vue')
  },
  {
    name: 'datasource',
    path: '/datasource',
    meta: {
      title: '高德地图'
    },
    component: () => import('@/views/datasource.vue')
  },
  {
    name: 'three',
    path: '/three',
    meta: {
      title: 'websocket'
    },
    component: () => import('@/views/three.vue')
  }
]

const productRoutes: RouteRecordRaw[] = [
  {
    path: 'product',
    component: RouterView,
    meta: {
      title: '商品'
    },
    children: [
      {
        path: 'list',
        name: 'product-list',
        component: () => import('@/views/product/list/index.vue'),
        meta: { // 自定义路由元数据
          title: '商品列表'
        }
      },
      {
        path: 'add',
        name: 'product-add',
        component: () => import('@/views/product/add/index.vue'),
        meta: {
          title: '添加商品'
        }
      },
      {
        path: 'attr',
        name: 'product-attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '商品规格'
        }
      },
      {
        path: 'classify',
        name: 'product-classify',
        component: () => import('@/views/product/classify/index.vue'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'reply',
        name: 'product-reply',
        component: () => import('@/views/product/reply/index.vue'),
        meta: {
          title: '商品评论'
        }
      }
    ]
  }
]

const mainRoutes = [...testroutes, ...productRoutes]
export default mainRoutes
