import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { State, IUserInfo } from './state'
import router from '@/router/'
// 这两种导入是有区别的 ，上面的导入会报错
// import { getItem, setItem } from '@/utils/storage.ts'
import { setItem, getItem } from '@/utils/storage'

import { USER } from '@/utils/constpool'
// 定义 injection key JSON.parse(window.localStorage.getItem('user') || 'null')
export const key: InjectionKey<Store<State>> = Symbol('store')
const state = {
  count: 0,
  isSollapsed: false,
  // user: null as ({ token: string } & IUserInfo) | null
  user: getItem<{ token: string } & IUserInfo>(USER)

  // user: getItem<(IUserInfo & { token: string })>(USER) as IUserInfo | null
}
export default state
// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    increment (state) {
      state.count++
    },
    setSollapsed (state, flag) {
      state.isSollapsed = flag
    },
    setUser (state, user) {
      state.user = user
      setItem(USER, JSON.stringify(user))
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
