import mutations from './mutations'
import getters from './getters'
import actions from './actions'

/**
 *
 * @typedef {Object<string, *>} LayerStoredState
 */

/**
 *
 * @typedef {Object} LayersVuexState
 * @property {Object<string, LayerStoredState>} states
 * @property {Object<string, Either<AxiosResponseError,Object>>} types - DescribeFeatureType json response
 * @property {string} current
 */

/**
 *
 * @type {LayersVuexState}
 */
const state = {
  states: {},
  types: {},
  current: null
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
