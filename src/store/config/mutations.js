import Vue from 'vue'
import { ConfigMutations } from '@/common/constants/mutations'

export default {
  /**
   *
   * @param {ConfigVuexState} _state
   * @param {Object} config
   */
  [ConfigMutations.SET_RAW_CONFIG] (_state, config) {
    Vue.set(_state, 'raw', config)
  },
  /**
   *
   * @param {ConfigVuexState} _state
   * @param {Error|Array<Error>} errors
   */
  [ConfigMutations.SET_ERRORS] (_state, errors) {
    if (!Array.isArray(errors)) errors = [errors]
    Vue.set(_state, 'errors', errors)
  },
  /**
   *
   * @param {ConfigVuexState} _state
   * @param {ProjectConfigObject} config
   */
  [ConfigMutations.SET_CONFIG] (_state, config) {
    Vue.set(_state, 'valid', config)
  }
}
