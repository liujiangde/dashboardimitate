import { createRouter, createWebHashHistory } from 'vue-router'
import { projectkey } from '../utils/constpool'
import routes from './routes'
import { store } from '@/store'
// 进度条功能
import NProgress from 'nprogress/nprogress.js'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  NProgress.start()
  // @ts-ignore
  // const { expires = 0 } = localStorage.getItem(projectkey + 'token') ?? {} // 为啥不是个空字符串或者0
  // if (to.name === 'login' && expires > Date.now()) {
  //   return to.query.redirect?.toString() ?? '/'
  // }

  if (to.meta.requireAuth === true && !store.state.user) {
    return { path: 'login', query: { redirect: to.fullPath } }
  }
})

// 目前不知道是啥用处，先抄着
router.afterEach(to => {
  NProgress.done()
  // TODO: title from sfc custom block?
  // const current = to.matched[to.matched.length - 1].components.default
  // const title = current.title ?? current.name
  const items = [projectkey]
  to.meta.title != null && items.unshift(to.meta.title)
  document.title = items.join(' · ')
})

export default router
