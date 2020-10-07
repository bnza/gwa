import { Services } from '@/common/constants'
import { forEach, values } from 'ramda'
import { getVersion } from '@/modules/server/service/capabilities'

/**
 * @typedef {Object} ServerService
 * @property {string} version
 * @property {Either<any,Object>} capabilities
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
      get version () {
        return this.capabilities.cata(() => '', getVersion)
      },
      capabilities: rootGetters['server/capabilities/get'](serverName, serviceName)
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
          getters.getService(name, serviceName)
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
