/**
 *
 * @param {ServerConfigObject} server
 * @param {Services} service
 */
export const getServiceUrl = (server, service) => `${server.baseUrl}/${server.services[service].path}`

export const getService = (server, service) => {

}
