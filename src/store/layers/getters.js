/**
 * @typedef {Object} LayerData
 * @property {LayerConfigObject} config
 * @property {ServerData} server
 */

export default {
  configs: (state, getters, rootState) => {
    return rootState.config.valid.layers
  },
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
   * @param {LayersVuexState} state
   * @return {function(string): boolean}
   */
  isCurrent: state => id => id === state.current
}
