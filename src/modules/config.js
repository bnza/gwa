import { prop, memoizeWith, find, propEq, identity } from 'ramda'

/**
 *
 * @param {ProjectConfigObject} projectConfig
 * @return {function(projectConfig): (Array<ServerConfigObject>)}
 */
export const getServers = projectConfig => prop('servers', projectConfig)

/**
 *
 * @param {Array<ServerConfigObject>} servers
 * @param {string} name
 * @return {ServerConfigObject}
 */
const findServer = (servers, name) => find(propEq('name', name), servers)

/**
 *
 * @param {Array<ServerConfigObject>} servers
 * @param {string} name
 * @return {ServerConfigObject}
 */
export const getServer = memoizeWith(identity, findServer)
