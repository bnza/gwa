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
 * @property {string} current
 */

/**
 *
 * @type {LayersVuexState}
 */
const state = {
  states: {},
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
