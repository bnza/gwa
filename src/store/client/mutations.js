import Vue from 'vue'
import { ClientMutations } from '@/common/constants/mutations'

export default {
  /**
   *
   * @param {ClientVuexState} _state
   * @param {Symbol} key
   */
  [ClientMutations.SET_REQUEST_PENDING] (_state, key) {
    _state.pending[key] = new Date()
  },
  /**
   *
   * @param {ClientVuexState} _state
   * @param {Symbol} key
   */
  [ClientMutations.SET_REQUEST_TERMINATED] (_state, key) {
    Vue.delete(_state.pending, key)
  }
}
