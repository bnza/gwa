import mutations from '@/store/baseMaps/mutations'
import actions from '@/store/baseMaps/actions'

const state = {
  active: '',
  osm: true,
  bing: {}
}
export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  actions
}
