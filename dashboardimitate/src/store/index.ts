import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { State } from './state'

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state () {
    return {
      count: 0,
      isSollapsed: false
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setSollapsed (state, flag) {
      state.isSollapsed = flag
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
