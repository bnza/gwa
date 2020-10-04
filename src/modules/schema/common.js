import Joi from 'joi'
import { stripCrsNamespace } from '@/modules/utils'

/**
 *
 * @typedef {Array} ExtentArray
 * @property {number} 0 - minx
 * @property {number} 1 - miny
 * @property {number} 2 - maxx
 * @property {number} 3 - maxy
 */

/**
 *
 * @typedef {Object} WfsCapabilitiesFeatureConfigObject
 * @property {string} name
 * @property {string} [title]
 * @property {string} [abstract]
 * @property {string} projection
 * @property {ExtentArray} extent
 */
/**
 *
 * @type {Joi.ArraySchema<ExtentArray>}
 */
export const extentSchema = Joi.array()
  .items(Joi.number())
  .length(4)

export const wgs84eSchema = Joi.number()
  .required()
  .max(180)
  .min(-180)

export const wgs84nSchema = Joi.number()
  .required()
  .max(90)
  .min(-90)

/**
 *
 * @type {Joi.ArraySchema}
 */
export const wgs84ExtentSchema = Joi.array()
  .ordered(wgs84eSchema, wgs84nSchema, wgs84eSchema, wgs84nSchema)
  .length(4)

/**
 *
 * @type {Joi.StringSchema}
 */
export const urlSchema = Joi.string().regex(
  /https?:\/\/((www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}|localhost)\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
)

export const projectionEpsgCode = Joi.string()
  .required()
  .regex(/EPSG:{1,2}\d+$/)
  .custom(stripCrsNamespace)

/**
 * @typedef {Object} ProjectionSchemaObject
 * @property {string} code
 * @property {string} def
 */

/**
 *
 * @type {Joi.ObjectSchema<ProjectionSchemaObject>}
 */
export const projectionSchema = Joi.object({
  code: Joi.string().required(),
  def: Joi.string().description('EPSG proj4 definition')
})

export const opacitySchema = Joi.number()
  .default(1)
  .ruleset.min(0)
  .max(1)
  .rule({ message: 'Number must be between 1 and 10' })
