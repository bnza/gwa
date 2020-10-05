import { forEach } from 'ramda'
import { LayerMutations } from '@/common/constants/mutations'

export default {
  /**
   *
   * @param commit
   * @param {LayerConfigObject} layerConfig
   */
  loadLayer ({ commit }, layerConfig) {
    commit(LayerMutations.SET_LAYER_STATE, { id: layerConfig.id, layerState: { visible: layerConfig.visible } })
  },
  loadConfigLayers ({ dispatch, getters }) {
    forEach(layerConfig => dispatch('loadLayer', layerConfig), getters.configs)
  }
}
