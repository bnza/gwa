import { Maybe } from 'monet'
import { find, propEq, filter } from 'ramda'

export default {
  /**
   *
   * @param state
   * @return {(function(): Array<ServerConfigObject>)}
   */
  servers: state => state.valid.servers,
  /**
   *
   * @param {ConfigVuexState} state
   * @return {function(name:string): Maybe<ServerConfigObject>}
   */
  getMaybeServer: state => name => {
    const config = find(propEq('name', name))(state.valid.servers)
    return config ? Maybe.of(config) : Maybe.none()
  },
  /**
   *
   * @param state
   * @param getters
   * @return {function(name:string): ServerConfigObject}
   */
  getServer: (state, getters) => name => {
    return find(propEq('name', name))(getters.servers)
  },
  layers: state => {
    // TODO add layerGroups
    return state.valid.layers
  },
  /**
   *
   * @param {ConfigVuexState} state
   * @param getters
   * @return {function(id:string): Maybe<LayerConfigObject>}
   */
  getMaybeLayer: (state, getters) => id => {
    const config = find(propEq('id', id))(getters.layers)
    return config ? Maybe.of(config) : Maybe.none()
  },
  /**
   *
   * @param {ConfigVuexState} state
   * @param getters
   * @return {function(id:string): LayerConfigObject}
   */
  getLayer: (state, getters) => id => {
    return find(propEq('id', id))(getters.layers)
  },
  /**
   *
   * @param state
   * @param getters
   * @return {function(groupName:string): Array<LayerConfigObject>}
   */
  getLayersByGroup: (state, getters) => groupName => {
    return filter(propEq('group', groupName), getters.layers)
  }
}
