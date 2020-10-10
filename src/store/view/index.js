import mutations from '@/store/view/mutations'
import actions from '@/store/view/actions'

export const state = {
  extent: []
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  actions
}
