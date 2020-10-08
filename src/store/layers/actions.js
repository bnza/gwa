import { map } from 'ramda'
import { LayerMutations } from '@/common/constants/mutations'
import DescribeFeatureType from '@/modules/server/service/wfs/operations/DescribeFeatureType'
import { Services } from '@/common/constants'

const fetchFeatureType = async ({ dispatch, rootGetters }, layerConfig) => {
  const server = rootGetters['config/getServer'](layerConfig.server)
  const featureType = rootGetters['server/capabilities/getFeatureType'](layerConfig.server, layerConfig.name)
  const fetchFeatureType = async () => await dispatch(
    'client/fetch',
    DescribeFeatureType.getRequestConfig(
      server,
      {
        typename: layerConfig.name,
        version: server.services.wfs.version
      }
    ),
    { root: true }
  )
  return await featureType.flatMap(fetchFeatureType)
}

export default {
  /**
   *
   * @param commit
   * @param dispatch
   * @param rootGetters
   * @param {LayerConfigObject} layerConfig
   */
  async loadLayer ({ commit, dispatch, rootGetters }, layerConfig) {
    commit(LayerMutations.SET_LAYER_STATE, { id: layerConfig.id, layerState: { visible: layerConfig.visible } })
    const type = await fetchFeatureType({ dispatch, rootGetters }, layerConfig)
    if (layerConfig.type === Services.wfs) {
      commit(LayerMutations.SET_TYPE, {
        id: layerConfig.id,
        type
      })
    }
  },
  loadConfigLayers ({ dispatch, getters }) {
    return Promise.all(map(layerConfig => dispatch('loadLayer', layerConfig), getters.configs))
  }
}
