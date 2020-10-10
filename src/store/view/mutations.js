import Vue from 'vue'
import { ViewMutations } from '@/common/constants/mutations'

export default {
  /**
   *
   * @param state
   * @return {function(Array): void}
   */
  [ViewMutations.SET_EXTENT]: (state, extent) => {
    Vue.set(state, 'extent', extent)
  },
  [ViewMutations.CLEAR_EXTENT]: state => {
    Vue.set(state, 'extent', [])
  }
}
