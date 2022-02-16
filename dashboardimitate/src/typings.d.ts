// “d.ts”文件用于为 TypeScript 提供有关用 JavaScript 编写的 API 的类型信息。
import { Store } from 'vuex'
import { RouterLink, RouterView } from 'vue-router'
import * as Naive from 'naive-ui/es/components'
// for vite inject env
import 'vite/client'

declare module 'vue' {
  // global components
  // eslint-disable-next-line no-unused-vars
  type GlobalComponents = typeof Naive & {
    RouterLink: typeof RouterLink
    RouterView: typeof RouterView
  }
}

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
  }
}
