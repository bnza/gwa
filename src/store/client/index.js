import actions from '@/store/client/actions'
import mutations from '@/store/client/mutations'
/**
 * @typedef {Object<Symbol, Date>} ClientPendingRequest
 */

/**
 * @typedef {Object} ClientVuexState
 * @property {ClientPendingRequest} pending
 */

/**
 *
 * @type {ClientVuexState}
 */
const state = {
  pending: {}
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations,
  actions
}
