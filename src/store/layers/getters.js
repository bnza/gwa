import { filter, map, keys, find, has, mergeRight, __ } from 'ramda'
import { Either } from 'monet'

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
  getType: (state, getters, rootState, rootGetters) => id => {
    const { server, name } = getters.getConfig(id)
    /**
     * @type {Either}
     */
    const featureType = rootGetters['server/capabilities/getFeatureType'](server, name)
    const type = has(id, state.types) ? state.types[id] : Either.left(`No such layer type ${id}`)
    return featureType.flatMap(_featureType => type.map(mergeRight(__, _featureType)))
  },
  /**
   *
   * @param {LayersVuexState} state
   * @return {function(string): boolean}
   */
  isCurrent: state => id => id === state.current
}
