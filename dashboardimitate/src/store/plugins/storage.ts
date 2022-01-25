import { Plugin } from 'vuex'
import { State } from '../state'
import { storage } from '../../utils'

const storagePlugin: Plugin<State> = store => {
  store.replaceState({
    name: import.meta.env.VITE_NAME as string,
    session: storage.get('session') ?? {},
    sidebarCollapsed: storage.get('sidebar_collapsed') ?? false,
    count: storage.get('demo_count') ?? 0
  })
}

export default storagePlugin
