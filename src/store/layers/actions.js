import { map, forEach } from 'ramda'
import { LayerMutations } from '@/common/constants/mutations'
import DescribeFeatureType from '@/modules/server/service/wfs/operations/DescribeFeatureType'
import { Services } from '@/common/constants'

const fetchFeatureType = ({ dispatch, rootGetters }, layerConfig) => {
  const server = rootGetters['config/getServer'](layerConfig.server)
  const featureType = rootGetters['server/capabilities/getFeatureType'](layerConfig.server, layerConfig.name)
  const fetchFeatureType = () => (dispatch(
    'client/fetchPromise',
    DescribeFeatureType.getRequestConfig(
      server,
      {
        typename: layerConfig.name,
        version: server.services.wfs.version
      }
    ),
    { root: true }
  )).then(e => e.map(DescribeFeatureType.normalizeResponse))
  return featureType.cata(
    e => Promise.resolve(e),
    fetchFeatureType
  )
}

export default {
  /**
   *
   * @param commit
   * @param dispatch
   * @param rootGetters
   * @param {LayerConfigObject} layerConfig
   */
  loadLayer ({ commit, dispatch, rootGetters }, layerConfig) {
    const a = fetchFeatureType({ dispatch, rootGetters }, layerConfig)
    return a.then(featureType => {
      commit(LayerMutations.INCREMENT_LOADED_LAYERS)
      if (layerConfig.type === Services.wfs) {
        commit(LayerMutations.SET_FEATURE_TYPE, {
          id: layerConfig.id,
          featureType
        })
      }
    })
  },
  setLayersStates ({ commit, getters }) {
    forEach(layerConfig => commit(
      LayerMutations.SET_LAYER_STATE,
      {
        id: layerConfig.id,
        layerState: {
          visible: layerConfig.visible
        }
      }), getters.configs)
  },
  loadConfigLayers ({ dispatch, getters }) {
    return Promise.all(map(layerConfig => dispatch('loadLayer', layerConfig), getters.configs))
  }
}
