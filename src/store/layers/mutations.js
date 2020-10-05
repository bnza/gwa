import Vue from 'vue'
import { LayerMutations } from '@/common/constants/mutations'

export default {
  /**
   *
   * @param {LayersVuexState} state
   * @param {string} id
   * @param {Object} layerConfig
   */
  [LayerMutations.SET_LAYER_STATE] (state, { id, layerState }) {
    Vue.set(state.states, id, layerState)
  },
  [LayerMutations.SET_PROP] (state, { id, key, value }) {
    if (!Object.prototype.hasOwnProperty.call(state.states, id)) {
      throw new Error(`No such layer "${id}"`)
    }
    Vue.set(state.states[id], key, value)
  },
  [LayerMutations.TOGGLE_PROP] (state, { id, key }) {
    if (!Object.prototype.hasOwnProperty.call(state.states, id)) {
      throw new Error(`No such layer "${id}"`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.states[id], key)) {
      throw new Error(`No such layer property "${key}"`)
    }
    if (typeof state.states[id][key] !== 'boolean') {
      throw new Error(
        `Only boolean values can be toggled. "${key}" type is ${typeof state.states[id][key]}`
      )
    }
    Vue.set(state.states[id], key, !state.states[id][key])
  },
  [LayerMutations.SET_CURRENT] (state, id) {
    Vue.set(state, 'current', id)
  }
}
