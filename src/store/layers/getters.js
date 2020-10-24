import { filter, map, keys, find, has, mergeRight, __ } from 'ramda'
import { Either } from 'monet'
import { getLayerInfo as getWmsInfo } from '@/modules/server/service/wms/capabilities'
import { getLayerInfo as getWfsInfo } from '@/modules/server/service/wfs/capabilities'
import { Services } from '@/common/constants'

/**
 * @typedef {Object} LayerData
 * @property {LayerConfigObject} config
 * @property {ServerData} server
 */

export default {
  configs: (state, getters, rootState) => {
    return rootState.config.valid.layers
  },
  /**
   *
   * @param state
   * @param getters
   * @return {function(id:string): LayerConfigObject}
   */
  getConfig: (state, getters) => id => getters.configs.find(layerConfig => layerConfig.id === id),
  /**
   *
   * @param state
   * @param getters
   * @param rootState
   * @param rootGetters
   * @return {function(config:LayerConfigObject): LayerData}
   */
  get: (state, getters, rootState, rootGetters) => config => {
    return {
      state: state.states[config.id],
      config,
      server: rootGetters['server/get'](config.server)
    }
  },
  /**
   *
   * @param {LayersVuexState} state
   * @return {function(id:string, key:string): *}
   */
  getProp: (state) => (id, key) => {
    if (!state.states[id]) {
      throw new Error(`No such layer ${id}`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.states[id], key)) {
      throw new Error(`No such layer property ${key}`)
    }
    return state.states[id][key]
  },
  /**
   *
   * @param state
   * @param getters
   * @param rootState
   * @param rootGetters
   * @return {function(groupName:string): Array<LayerConfigObject>}
   */
  getReadyLayerConfigsByGroup: (state, getters, rootState, rootGetters) => groupName => {
    const groupLayers = rootGetters['config/getLayersByGroup'](groupName)
    /**
     * Ready layers have been added to state.states
     * @type {Array<string>}
     */
    const readyLayersIds = filter(
      id => find(layer => layer.id === id, groupLayers),
      keys(state.states)
    )
    return /** @type Array<LayerConfigObject> */ map(id => getters.getConfig(id), readyLayersIds)
  },
  getFeatureType: (state, getters, rootState, rootGetters) => id => {
    const { server, name } = getters.getConfig(id)
    /**
     * @type {Either}
     */
    const featureType = rootGetters['server/capabilities/getFeatureType'](server, name)
    const type = has(id, state.featureTypes) ? state.featureTypes[id] : Either.left(`No such layer type ${id}`)
    return featureType.flatMap(_featureType => type.map(mergeRight(__, _featureType)))
  },
  getLayerInfo: (state, getters, rootState, rootGetters) => id => {
    const { server, name, type } = getters.getConfig(id)
    const infos = rootGetters['server/capabilities/getLayersInfos'](server, type)
    const functions = { [Services.wms]: getWmsInfo, [Services.wfs]: getWfsInfo }
    return infos.flatMap(_infos => functions[type](name, _infos))
  },
  /**
   *
   * @param {LayersVuexState} state
   * @return {function(string): boolean}
   */
  isActive: state => id => id === state.active,
  /**
   *
   * @param state
   * @param getters
   * @return {function(id: string): boolean}
   */
  hasFeatures: (state, getters) => id => {
    return getters.isActive(id) && getters.getConfig(id).type === Services.wfs
  },
  /**
   *
   * @param state
   * @param getters
   * @return {boolean}
   */
  activeLayerHasFeatures: (state, getters) => {
    return !!state.active && getters.hasFeatures(state.active)
  },
  /**
   *
   * @param state
   * @return {boolean}
   */
  hasSelectedFeature: (state) => state.selectedFeature.isSome()
}
