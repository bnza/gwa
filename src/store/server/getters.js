import { Services } from '@/common/constants'
import { forEach, values, lensProp, set } from 'ramda'

/**
 * @typedef {Object} ServerService
 * @property {Either<Error,Object>} capabilities
 */

/**
 * @typedef {Object<string, ServerService>} ServerServices
 */

/**
 * @typedef {Object} ServerData
 * @property {ServerConfigObject} config
 * @property {ServerServices} services
 */

/**
 * Getters
 */
export default {
  /**
   *
   * @param state
   * @param getters
   * @param rootState
   * @param rootGetters
   * @return {function(serverName:string, serviceName:Services): ServerService}
   */
  getService: (state, getters, rootState, rootGetters) => (serverName, serviceName) => {
    return {
      capabilities: rootGetters['server/capabilities/getServerServicesCapabilities'](serverName, serviceName)
    }
  },
  /**
   *
   * @param state
   * @param getters
   * @param rootState
   * @param rootGetters
   * @return {function(name:string): ServerData}
   */
  get: (state, getters, rootState, rootGetters) => name => {
    const config = rootGetters['config/getServer'](name)
    const services = {}
    forEach(
      serviceName => {
        services[serviceName] = Object.freeze(
          set(
            lensProp('version'),
            config.services[serviceName].version,
            getters.getService(name, serviceName)
          )
        )
      },
      values(Services)
    )
    return {
      config,
      services
    }
  }
}
