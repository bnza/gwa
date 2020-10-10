import { has } from 'ramda'
import { Either } from 'monet'
import { Services } from '@/common/constants'
import { getFeatureType, getFeatureTypeList } from '@/modules/server/service/wfs/capabilities'
import { getLayersInfos as getWmsInfos } from '@/modules/server/service/wms/capabilities'

const getService = (state, name, service) => {
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
    return getService(state, name, service)
  },
  getFeatureTypeList: (state) => serverName => {
    return getService(state, serverName, Services.wfs).map(getFeatureTypeList)
  },
  getFeatureType: (state, getters) => (serverName, typeName) => {
    return getters.getFeatureTypeList(serverName).flatMap(typeList => getFeatureType(typeName, typeList))
  },
  getLayersInfos: (state) => (serverName, serviceName) => {
    const mapper = {
      [Services.wfs]: getFeatureTypeList,
      [Services.wms]: getWmsInfos
    }
    return getService(state, serverName, serviceName).map(mapper[serviceName])
  }
}
