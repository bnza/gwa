import { keys, forEach, partial, compose } from 'ramda'
import { Services } from '@/common/constants'
import { CapabilitiesMutations } from '@/common/constants/mutations'
import { getCapabilitiesOperationRequestConfig } from '@/modules/server/service/operation'
import { parseXmlEither } from '@/modules/server/service/capabilities'

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
    /**
     * @param {string} service
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
     * @param {string} service
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
     * @param {string }service
     */
    const fetchCapabilities = service => {
      const loadCapabilities = compose(
        partial(commitParsed, [service]),
        parseXmlEither,
        partial(commitXml, [service])
      )
      fetchServerServiceCapabilities(
        { dispatch }, {
          server,
          service
        }).then(loadCapabilities)
    }
    forEach(fetchCapabilities, keys(Services))
  },
  loadServersCapabilities ({ dispatch, rootState }) {
    forEach(server => dispatch('loadServerCapabilities', { server }), rootState.config.valid.servers)
  }
}
