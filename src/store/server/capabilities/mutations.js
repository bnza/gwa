import Vue from 'vue'
import { Left } from 'monet'
import { CapabilitiesMutations } from '@/common/constants/mutations'
import { Services } from '@/common/constants'

/**
 * @typedef {import('monet').Either} Either
 */

/**
 *
 * @param {ServerCapabilitiesVuexState} state
 * @param {string} name - The serve name
 * @param {string} service - The service name
 * @throws
 */
const checkServerService = (state, name, service) => {
  if (!Object.prototype.hasOwnProperty.call(state, name)) {
    throw new Error(`No such server ${name}`)
  }
  if (!Object.prototype.hasOwnProperty.call(Services, service)) {
    throw new Error(`No such server service ${name}`)
  }
  if (!Object.prototype.hasOwnProperty.call(state[name], service)) {
    throw new Error(`You must set up ${service} server service before set capabilities`)
  }
}

export default {
  /**
   *
   * @param {ServerCapabilitiesVuexState} _state
   * @param {{ServerConfigObject}} name - The server name
   */
  [CapabilitiesMutations.SET_SERVER_CAPABILITIES] (_state, name) {
    if (!Object.prototype.hasOwnProperty.call(_state, name)) {
      Vue.set(_state, name, {})
      Object.keys(Services).forEach(serviceName => {
        Vue.set(_state[name], serviceName, Left('Not set'))
      })
    }
  },
  /**
   *
   * @param {ServerCapabilitiesVuexState} _state
   * @param {string} name - The serve name
   * @param {string} service - The service name
   * @param {Either<*,Object>} parsed - The parsed GetCapabilities object
   */
  [CapabilitiesMutations.SET_SERVICE_CAPABILITIES] (_state, { name, service, either }) {
    checkServerService(_state, name, service)
    Vue.set(_state[name], service, either)
  }
}
