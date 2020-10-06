import { Either, Left } from 'monet'
import { keys, forEach, partial } from 'ramda'
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
const fetchServerServiceCapabilities = ({ dispatch }, { server, service }) => {
  return dispatch('client/fetch', getCapabilitiesOperationRequestConfig(server, service), { root: true })
}

export default {

  /**
   * @param dispatch
   * @param commit
   * @param {ServerConfigObject} server
   */
  loadServerCapabilities ({ dispatch, commit }, { server }) {
    commit(CapabilitiesMutations.SET_SERVER_CAPABILITIES, server.name)
    const commitLeft = (service, error) => {
      const left = Left(error)
      commit(CapabilitiesMutations.SET_CAPABILITIES_PARSED, {
        name: server.name,
        service,
        parsed: left
      })
      return left
    }
    /**
     * @param {Services} service
     * @param {string} xml
     * @return {string}
     */
    const commitXml = (service, xml) => {
      commit(CapabilitiesMutations.SET_CAPABILITIES_XML, {
        name: server.name,
        service,
        xml
      })
      return xml
    }
    /**
     * @param {Services} service
     * @param {Object} parsed
     * @return {void}
     */
    const commitParsed = (service, parsed) => {
      commit(CapabilitiesMutations.SET_CAPABILITIES_PARSED, {
        name: server.name,
        service,
        parsed
      })
    }

    /**
     * Fetch service capabilities, parses XML and commit both XML and parsed
     * @param {Services }service
     */
    const fetchCapabilities = service => {
      const loadCapabilities = xml => {
        commitXml(service, xml)
        Either.fromTry(() => parseXml(xml)).map(partial(commitParsed, [service]))
      }
      fetchServerServiceCapabilities(
        { dispatch }, {
          server,
          service
        }).then(
        response => response.map(
          loadCapabilities
        ).catchMap(
          partial(commitLeft, [service])
        )
      )
    }
    forEach(fetchCapabilities, keys(Services))
  },
  loadServersCapabilities ({ dispatch, rootState }) {
    forEach(server => dispatch('loadServerCapabilities', { server }), rootState.config.valid.servers)
  }
}
