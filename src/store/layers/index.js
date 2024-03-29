import { None } from 'monet'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import query from './query'

/**
 *
 * @typedef {Object<string, *>} LayerStoredState
 */

/**
 *
 * @typedef {Object} LayersVuexState
 * @property {Object<string, LayerStoredState>} states
 * @property {Object<string, Either<AxiosResponseError,Object>>} types - DescribeFeatureType json response
 * @property {string} active
 */

/**
 *
 * @type {LayersVuexState}
 */
const state = {
  loaded: 0,
  states: {},
  featureTypes: {},
  active: null,
  selectedFeature: None()
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    query
  }
}
