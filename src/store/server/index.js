import getters from '@/store/server/getters'
import capabilities from './capabilities'
const state = {

}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  modules: {
    capabilities
  }
}
