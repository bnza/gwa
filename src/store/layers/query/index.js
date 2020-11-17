import mutations from './mutations'
import getters from '@/store/layers/query/getters'
import actions from '@/store/layers/query/actions'

const state = {
  parameters: {}
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
