import { getServerServiceOperationUrl } from '@/modules/server/service/operation'
import { WfsOperations } from '@/common/constants/operations'
import { Services } from '@/common/constants'
import { mergeRight } from 'ramda'
import { WfsVersions } from '@/common/constants/server'
/**
 * @typedef {Object} WfsDescribeFeatureTypeProperties
 * @property {string} name
 * @property {number} maxOccurs
 * @property {number} minOccurs
 * @property {boolean} nillable
 * @property {string} type
 * @property {string} localType
 */

/**
 * @typedef {Object} WfsDescribeFeatureTypeRawResponseFeatureType
 * @property {string} typename
 * @property {Array<WfsDescribeFeatureTypeProperties>} properties
 */

/**
 * @typedef {Object} WfsDescribeFeatureTypeRawResponse
 * @property {string} elementFormDefault
 * @property {string} targetNamespace
 * @property {string} targetPrefix
 * @property {Array<WfsDescribeFeatureTypeRawResponseFeatureType>} featureTypes
 */

/**
 * @typedef {Object} WfsDescribeFeatureTypeResponse
 * @property {string} elementFormDefault
 * @property {string} targetNamespace
 * @property {Array<WfsDescribeFeatureTypeProperties>} properties
 */

/**
 * @typedef {BaseOperationOptions} WfsDescribeFeatureTypeRequestParametersObject
 * @property {string} request
 * @see https://docs.geoserver.org/stable/en/user/services/wfs/vendor.html#reprojection
 */

/**
 * @typedef {WfsDescribeFeatureTypeRequestParametersObject} Wfs110DescribeFeatureTypeRequestParametersObject
 * @property {string} typeName
 */

/**
 * @typedef {WfsGetFeatureRequestParametersObject} Wfs200DescribeFeatureTypeRequestParametersObject
 * @property {string} typeName
 */

/**
 * @typedef {BaseOperationOptions} WfsDescribeFeatureTypeOperationOptions
 * @property {string} typename
 */

/**
 *
 * @param {WfsDescribeFeatureTypeOperationOptions} options
 * @return {WfsDescribeFeatureTypeRequestParametersObject}
 */
const wfsOptionsNormalizer = options => {
  return {
    service: Services.wfs,
    request: WfsOperations.DESCRIBE_FEATURE_TYPE,
    version: options.version,
    outputFormat: 'application/json',
    exceptions: 'application/json'
  }
}

/**
 *
 * @param {WfsGetFeatureOperationOptions} options
 * @return {Partial<Wfs110DescribeFeatureTypeRequestParametersObject>}
 */
const wfs110OptionsNormalizer = options => {
  return {
    typeName: options.typename
  }
}

/**
 *
 * @param {WfsGetFeatureOperationOptions} options
 * @return {Partial<Wfs200DescribeFeatureTypeRequestParametersObject>}
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
   * @param {WfsDescribeFeatureTypeOperationOptions} options
   * @return {AxiosRequestConfig}
   */
  getRequestConfig: (server, options) => {
    // TODO check version
    return {
      url: getServerServiceOperationUrl(server, Services.wfs, mergeRight(
        normalizers[options.version](options),
        wfsOptionsNormalizer(options)
      ))
    }
  },
  /**
   *
   * @param {WfsDescribeFeatureTypeRawResponse} responseObject
   * @return {WfsDescribeFeatureTypeResponse}
   */
  normalizeResponse: responseObject => {
    return {
      elementFormDefault: responseObject.elementFormDefault,
      targetNamespace: responseObject.targetNamespace,
      properties: responseObject.featureTypes[0].properties
    }
  }

})
