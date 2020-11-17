import { mergeRight } from 'ramda'
import { createElementNS } from 'ol/xml'
import { writeStringTextNode } from 'ol/format/xsd'
import { WfsOperations } from '@/common/constants/operations'
import { Services } from '@/common/constants'
import { WfsVersions } from '@/common/constants/server'
import { getServerServiceOperationUrl } from '@/modules/server/service/operation'

/**
 * @typedef {BaseOperationOptions} WfsGetFeatureRequestParametersObject
 * @property {string} request
 * @property {string} [featureID] - The requested feature ID, will override any further filter/pagination parameters
 * @property {string} [srsName] - the reprojection SRS
 * @see https://docs.geoserver.org/stable/en/user/services/wfs/vendor.html#reprojection
 */

/**
 * @typedef {WfsGetFeatureRequestParametersObject} Wfs110GetFeatureRequestParametersObject
 * @property {string} typeName
 */

/**
 * @typedef {WfsGetFeatureRequestParametersObject} Wfs200GetFeatureRequestParametersObject
 * @property {string} typeName
 */

/**
 * @typedef {BaseOperationOptions} WfsGetFeatureOperationOptions
 * @property {string} typename - The requested layer fully qualified name (e.g. ns:name)
 * @property {string} [featureID] - The requested feature ID, will override any further filter/pagination parameters
 * @property {string} [srsName] - the reprojection SRS
 * @see https://docs.geoserver.org/stable/en/user/services/wfs/vendor.html#reprojection
 */

/**
 * @typedef {import('ol/format/filter/Filter').default} Filter
 */

/**
 *
 * @param {WfsGetFeatureOperationOptions} options
 * @return {WfsGetFeatureRequestParametersObject}
 */
const wfsOptionsNormalizer = options => {
  return {
    request: WfsOperations.GET_FEATURE,
    version: options.version,
    srsName: options.srsName,
    outputFormat: 'application/json',
    exceptions: 'application/json',
    cql_filter: options.cql_filter
  }
}

/**
 *
 * @param {WfsGetFeatureOperationOptions} options
 * @return {Partial<Wfs110GetFeatureRequestParametersObject>}
 */
const wfs110OptionsNormalizer = options => {
  return {
    typeName: options.typename
  }
}

/**
 *
 * @param {WfsGetFeatureOperationOptions} options
 * @return {Partial<Wfs200GetFeatureRequestParametersObject>}
 */
const wfs200OptionsNormalizer = options => {
  return {
    typeNames: options.typename
  }
}

const normalizers = {
  [WfsVersions.v100]: wfs110OptionsNormalizer,
  [WfsVersions.v110]: wfs110OptionsNormalizer,
  [WfsVersions.v200]: wfs200OptionsNormalizer
}

export default Object.freeze({

  /**
   *
   * @param {ServerConfigObject} server
   * @param {WfsGetFeatureOperationOptions} options
   * @return {AxiosRequestConfig}
   */
  getRequestConfig:
    (server, options) => {
      // TODO check version
      return {
        url: getServerServiceOperationUrl(server, Services.wfs, mergeRight(
          normalizers[options.version](options),
          wfsOptionsNormalizer(options)
        ))
      }
    }
})

/**
 * @type {string}
 */
const OGCNS = 'http://www.opengis.net/ogc'

const writeSortByNode = (node, sortBy) => {
  const sortOrderNode = createElementNS(OGCNS, 'SortOrder')
  writeStringTextNode(sortOrderNode, sortBy.sortOrder)
  const propertyNameNode = createElementNS(OGCNS, 'PropertyName')
  writeStringTextNode(propertyNameNode, sortBy.propertyName)
  const sortPropertyNode = createElementNS(OGCNS, 'SortProperty')
  sortPropertyNode.appendChild(propertyNameNode)
  sortPropertyNode.appendChild(sortOrderNode)
  const sortByNode = createElementNS(OGCNS, 'SortBy')
  sortByNode.appendChild(sortPropertyNode)
  node.firstElementChild.appendChild(sortByNode)
  return node
}

export const addSortByToQueryNode = (getFeature, pagination) => {
  return writeSortByNode(getFeature, pagination)
}

/**
 * Converts ol Filter object into array
 * @param {Filter} filter
 * @return {*[]}
 */
export const denormalizeFilter = (filter) => {
  return []
}
