import { keys, map } from 'ramda'
import { Services } from '@/common/constants'
import { CapabilitiesMutations } from '@/common/constants/mutations'
import { getCapabilitiesOperationRequestConfig } from '@/modules/server/service/operation'
import { parseXml } from '@/modules/server/service/capabilities'

/**
 *
 * @param dispatch
 * @param commit
 * @param {ServerConfigObject} server
 * @param {Services} service
 */
const fetchServerServiceCapabilities = async ({ dispatch }, { server, service }) => {
  return await dispatch('client/fetch', getCapabilitiesOperationRequestConfig(server, service), { root: true })
}

/**
 *
 * @param dispatch
 * @param commit
 * @param {ServerConfigObject} server
 * @param {Services} service The service name
 * @return {Either<Object>}
 */
const loadServiceCapabilities = async ({ dispatch, commit }, { server, service }) => {
  /**
   * @param {Object} either
   * @return {Either<*,Object>}
   */
  const commitCapabilities = either => {
    commit(CapabilitiesMutations.SET_SERVICE_CAPABILITIES, {
      name: server.name,
      service,
      either
    })
    return either
  }
  const capabilities = await fetchServerServiceCapabilities({ dispatch }, { server, service })
  return commitCapabilities(capabilities.flatMap(parseXml))
}

export default {
  async loadServicesCapabilities ({ dispatch, commit }, server) {
    commit(CapabilitiesMutations.SET_SERVER_CAPABILITIES, server.name)
    await Promise.all(
      keys(Services).map(
        service => loadServiceCapabilities({ dispatch, commit }, { server, service })
      )
    )
  },
  async loadServersCapabilities ({ dispatch, rootState }) {
    await Promise.all(map(server => dispatch('loadServicesCapabilities', server), rootState.config.valid.servers))
  }
}
