import { Left } from 'monet'
import { keys, forEach } from 'ramda'
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

const loadServiceCapabilities = async ({ dispatch, commit }, { server, service }) => {
  /**
   * @param {string} xml
   * @return {string}
   */
  const commitXml = xml => {
    commit(CapabilitiesMutations.SET_CAPABILITIES_XML, {
      name: server.name,
      service,
      xml
    })
    return xml
  }
  /**
   * @param {Object} parsed
   * @return {Object}
   */
  const commitParsed = parsed => {
    commit(CapabilitiesMutations.SET_CAPABILITIES_PARSED, {
      name: server.name,
      service,
      parsed
    })
    return parsed
  }
  const commitLeft = error => {
    const left = Left(error)
    commit(CapabilitiesMutations.SET_CAPABILITIES_PARSED, {
      name: server.name,
      service,
      parsed: left
    })
    return left
  }
  const capabilities = await fetchServerServiceCapabilities({ dispatch }, { server, service })
  return capabilities
    .map(commitXml).catchMap(commitLeft)
    .map(parseXml)
    .map(commitParsed).catchMap(commitLeft)
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
  loadServersCapabilities ({ dispatch, rootState }) {
    forEach(server => dispatch('loadServicesCapabilities', server), rootState.config.valid.servers)
  }
}
