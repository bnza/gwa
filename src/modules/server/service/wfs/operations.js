import { Services } from '@/common/constants'
import { WfsOperations } from '@/common/constants/operations'
import { getCapabilitiesOperationRequestConfig } from '@/modules/server/service/operation'

export const Operations = Object.freeze({
  [WfsOperations.GET_CAPABILITIES]: Object.freeze({
    /**
     *
     * @param {ServerConfigObject} server
     * @param {{[version]: string}} options
     * @return {AxiosRequestConfig}
     */
    getRequestConfig:
      (server, options = {}) =>
        getCapabilitiesOperationRequestConfig(server, Services.wfs, options)
  })
})
