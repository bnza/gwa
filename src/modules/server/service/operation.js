import { stringify } from 'qs'
import { partialRight, mergeRight } from 'ramda'
import { GET_CAPABILITIES } from '@/common/constants/operations'
import { getServiceUrl } from '@/modules/server/service/index'
/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */

/**
 * @typedef {Object} BaseOperationOptions
 * @property {string} request
 * @property {string} [service]
 * @property {string} [version]
 */

/**
 *
 * @type {function(BaseOperationOptions, QueryString.IStringifyOptions): string}
 */
export const getQuery = stringify

/**
 *
 * @type {function(BaseOperationOptions): (string)}
 */
export const getQueryFragment = partialRight(getQuery, [{ addQueryPrefix: true }])

/**
 *
 * @param {ServerConfigObject} server
 * @param {Services} service
 * @param {BaseOperationOptions} options
 */
export const getServerServiceOperationUrl = (server, service, options) => {
  return `${getServiceUrl(server, service)}${getQueryFragment(options)}`
}

/**
 *
 * @param {ServerConfigObject} server
 * @param {Services} service
 * @param {{[version]: string}} options
 * @return {AxiosRequestConfig}
 */
export const getCapabilitiesOperationRequestConfig = (server, service, options = {}) => {
  return {
    url: getServerServiceOperationUrl(server, service, mergeRight(options, { request: GET_CAPABILITIES }))
  }
}
