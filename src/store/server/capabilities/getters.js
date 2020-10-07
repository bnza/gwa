import { has } from 'ramda'
import { Either } from 'monet'
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
   * @return {function(name:string, service:Services): Either<Object>}
   */
  get: (state) => (name, service) => {
    if (!has(service, Services)) {
      return Either.left(`No such service ${name}`)
    }
    if (!has(name, state)) {
      return Either.left(`No such server ${name}`)
    }
    if (!has(service, state[name])) {
      return Either.left(`No such server service ${name}`)
    }
    return state[name][service]
  }
}
