import { MutationTree } from 'vuex'
import { State } from './state'
import { TOGGLE_SIDEBAR_COLLAPSE, INCREMENT, DECREMENT } from './mutation-types'


const mutations: MutationTree<State> = {
    // 事件类型使用常量时需用中括号[]包裹起来 https://www.cnblogs.com/jincanyu/p/14353588.html
  [TOGGLE_SIDEBAR_COLLAPSE] : state => {
    state.sidebarCollapsed = !state.sidebarCollapsed
  },
  [INCREMENT]: state => {
    state.count++
  },
}
export default mutations

