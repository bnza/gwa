import Joi from 'joi'
import { wgs84ExtentSchema } from '@/modules/schema/common'

/**
 * @typedef {Object} ServerServicesConfigObject
 * @property {WfsVersions} wfs
 */

/**
 * @typedef {Object} ServerConfigObject
 * @property {string} name - The server name
 * @property {string} baseUrl - The server base URL
 * @property {ServerServicesConfigObject} services
 */

const stripCrsNamespace = string =>
  string.replace(/(.+)(EPSG):{1,2}(\d+)$/, '$2:$3')

export const wfsCapabilitiesFeatureTypeSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string(),
  abstract: Joi.string(),
  projection: Joi.string()
    .required()
    .regex(/EPSG:{1,2}\d+$/)
    .custom(stripCrsNamespace),
  bbox: wgs84ExtentSchema
})
