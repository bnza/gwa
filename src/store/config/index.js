import mutations from '@/store/config/mutations'
import actions from '@/store/config/actions'
/**
 * @typedef {Object} ConfigVuexState
 * @property {Object} raw
 * @property {Error} error
 * @property {ProjectConfigObject} valid
 */

/**
 * @type {ConfigVuexState}
*/
const state = {
  raw: null,
  errors: null,
  valid: null
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  actions
}
