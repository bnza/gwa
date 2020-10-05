import getters from './getters'
import mutations from './mutations'
import actions from './actions'

/**
 * @typedef {Object} ServerServiceCapabilities
 * @property {string} xml
 * @property {string} parsed
 */

/**
 * @typedef {Object<string, Object>} ServerServicesCapabilities
 */

/**
 *
 * @typedef {Object<string, ServerServicesCapabilities>} ServerCapabilitiesVuexState
 */

/**
 *
 * @type {ServerCapabilitiesVuexState}
 */
const state = {}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
