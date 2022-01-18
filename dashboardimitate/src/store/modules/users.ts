import { Module } from 'vuex'
import { State } from '../state'
interface UserState {
  count: number
}

// Module< UserState, State> 这个啥意思

const mod: Module< UserState, State> = {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {},
  mutations: {},
  actions: {}
}

export default mod
