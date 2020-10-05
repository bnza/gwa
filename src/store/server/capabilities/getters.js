import { Services } from '@/common/constants'

export default {
  unloadedServerCapabilities: (state, getters, rootState) => {
    return rootState.config.valid.servers.filter(
      server => !Object.prototype.hasOwnProperty.call(state, server.name)
    )
  },
  /**
   *
   * @param {ServerCapabilitiesVuexState} state
   * @return {function(name:string, service:Services): Object}
   */
  getServerServicesCapabilities: (state) => (name, service) => {
    if (!Object.prototype.hasOwnProperty.call(state, name)) {
      throw new Error(`No such server ${name}`)
    }
    if (!Object.prototype.hasOwnProperty.call(Services, service)) {
      throw new Error(`No such server service ${name}`)
    }
    return state[name][service].parsed
  }
}
