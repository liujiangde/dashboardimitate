// import Home from '../views/home'
// import Update from '../views/'

import { RouteRecordRaw, RouterView } from 'vue-router'

// meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。

const testroutes: RouteRecordRaw[] = [
  {
    name: 'defult',
    path: '/',
    meta: {
      title: '家',
      requireAuth: true
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
      title: '首页',
      requireAuth: true

    },
    component: () => import('@/views/home.vue')
  },
  {
    name: 'update',
    meta: {
      title: 'websocket',
      requireAuth: true
    },
    path: '/update',

    component: () => import('@/views/update.vue')
  },
  {
    name: 'overview',
    meta: {
      requireAuth: true
    },
    path: '/overview',
    component: () => import('@/views/update.vue')
  },
  {
    name: 'datasource',
    path: '/datasource',
    meta: {
      requireAuth: true,
      title: '高德地图'
    },
    component: () => import('@/views/datasource.vue')
  },
  {
    name: 'three',
    path: '/three',
    meta: {
      requireAuth: true,
      title: 'three'
    },
    component: () => import('@/views/three.vue')
  }
]

const productRoutes: RouteRecordRaw[] = [
  {
    path: 'product',
    component: RouterView,
    meta: {
      requireAuth: true,
      title: '商品'
    },
    children: [
      {
        path: 'list',
        name: 'product-list',
        component: () => import('@/views/product/list/index.vue'),
        meta: { // 自定义路由元数据
          requireAuth: true,
          title: '商品列表'
        }
      },
      {
        path: 'add',
        name: 'product-add',
        component: () => import('@/views/product/add/index.vue'),
        meta: {
          requireAuth: true,
          title: '添加商品'
        }
      },
      {
        path: 'attr',
        name: 'product-attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          requireAuth: true,
          title: '商品规格'
        }
      },
      {
        path: 'classify',
        name: 'product-classify',
        component: () => import('@/views/product/classify/index.vue'),
        meta: {
          requireAuth: true,
          title: '商品分类'
        }
      },
      {
        path: 'reply',
        name: 'product-reply',
        component: () => import('@/views/product/reply/index.vue'),
        meta: {
          requireAuth: true,
          title: '商品评论'
        }
      }
    ]
  }
]

const permissionRoutes: RouteRecordRaw[] = [
  {
    path: 'system_admin',
    component: RouterView,
    meta: {
      title: '权限管理',
      requireAuth: true
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/admin/index.vue'),
        meta: {
          requireAuth: true,
          title: '管理员设置'
        }
      }
    ]
  }
]
const mainRoutes = [...testroutes, ...productRoutes, ...permissionRoutes]
export default mainRoutes
