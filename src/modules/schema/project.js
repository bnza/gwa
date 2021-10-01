import Joi from 'joi'
import { v4 } from 'uuid'
import { mergeRight } from 'ramda'
import {
  urlSchema,
  projectionSchema,
  extentSchema,
  opacitySchema
} from '@/modules/schema/common'
import { styleSchema } from '@/modules/schema/style'
import { stripCrsNamespace, appendSlash } from '@/modules/utils'

/**
 * @typedef {Object} LayerConfigObject
 * @property {string} attributions
 * @property {ExtentArray} extent
 * @property {string} id
 * @property {string} label
 * @property {string} name - The server name
 * @property {number} opacity
 * @property {string} server
 * @property {string} type
 * @property {boolean} visible
 */

/**
 *
 * @type {Joi.ObjectSchema<LayerConfigObject>}
 */
export const layerSchema = Joi.object({
  attributions: Joi.string(),
  extent: extentSchema,
  id: Joi.string().default(() => v4()),
  label: Joi.string().default(Joi.ref('name')),
  name: Joi.string()
    .required()
    .regex(/^([\w-]+:)?[\w-]+$/),
  opacity: opacitySchema,
  server: Joi.string().default('default'),
  type: Joi.string()
    .required()
    .valid('wfs', 'wms', 'wmts'),
  visible: Joi.boolean().default(true),
  group: Joi.string().default('default'),
  crs: Joi.string()
})

export const wfsLayerSchema = layerSchema.append({
  type: Joi.string()
    .required()
    .default('wfs')
    .valid('wfs'),
  style: styleSchema.default()
})

export const wmsLayerSchema = layerSchema.append({
  type: Joi.string()
    .required()
    .default('wms')
    .valid('wms')
})

export const wmtsLayerSchema = layerSchema.append({
  type: Joi.string()
    .required()
    .default('wmts')
    .valid('wmts')
})

const serverMustExistConstraint = {
  server: Joi.string()
    .default('default')
    .valid(
      Joi.in('/servers', {
        adjust: servers => servers.map(server => server.name)
      })
    )
}

const _layerSchema = Joi.alternatives().conditional('.type', [
  { is: 'wfs', then: wfsLayerSchema.append(serverMustExistConstraint) },
  { is: 'wms', then: wmsLayerSchema.append(serverMustExistConstraint) },
  {
    is: 'wmts',
    then: wmtsLayerSchema.append(serverMustExistConstraint),
    otherwise: Joi.object(
      {
        type: Joi.string().required().valid('wfs', 'wms', 'wmts')
      }).unknown()
  }
])

const groupNameReferenceConstraint = {
  group: Joi.string().default(Joi.ref('....name'))
}

/**
 *
 * @type {Joi.ArraySchema<>}
 */
const projectLayersSchema = Joi.array()
  .items(
    _layerSchema
  )
  .unique('id')
  .min(1)

const _groupedLayerSchema = Joi.alternatives().conditional('.type', [
  { is: 'wfs', then: wfsLayerSchema.append(mergeRight(serverMustExistConstraint, groupNameReferenceConstraint)) },
  { is: 'wms', then: wmsLayerSchema.append(mergeRight(serverMustExistConstraint, groupNameReferenceConstraint)) },
  {
    is: 'wmts',
    then: wmtsLayerSchema.append(mergeRight(serverMustExistConstraint, groupNameReferenceConstraint)),
    otherwise: Joi.object(
      {
        type: Joi.string().required().valid('wfs', 'wms', 'wmts')
      }).unknown()
  }
])

const projectGroupedLayersSchema = Joi.array()
  .items(
    _groupedLayerSchema
  )
  .unique('id')
  .min(1)

/**
 * @typedef {Object} ServerServiceConfigObject
 * @property {string} version - The server name
 * @property {string} path - The wfs URL path (default "wfs")
 */

/**
 * @typedef {ServerServiceConfigObject} WfsServerServiceConfigObject
 */

/**
 * @typedef {Object} serverServicesConfigObject
 * @property {WfsServerServiceConfigObject} wfs
 */

export const serverWfsServicesSchema = Joi.object({
  path: Joi.string().default('wfs'),
  version: Joi.string()
    .default('2.0.0')
    .allow('1.0.0', '1.1.0', '2.0.0')
})

export const serverWmsServicesSchema = Joi.object({
  path: Joi.string().default('wms'),
  version: Joi.string()
    .default('1.3.0')
    .allow('1.1.0', '1.3.0')
})

export const serverWmtsServicesSchema = Joi.object({
  path: Joi.string().default('gwc/service/wmts'),
  version: Joi.string()
    .default('1.0.0')
    .allow('1.0.0')
})

export const serverServicesSchema = Joi.object({
  wfs: serverWfsServicesSchema.default(),
  wms: serverWmsServicesSchema.default(),
  wmts: serverWmtsServicesSchema.default()
})

/**
 * @typedef {Object} ServerConfigObject
 * @property {string} name - The server name
 * @property {string} baseUrl - The server base URL
 * @property {serverServicesConfigObject} services
 */

/**
 *
 * @type {Joi.ObjectSchema<ServerConfigObject>}
 */
export const serverSchema = Joi.object({
  name: Joi.string().default('default'),
  baseUrl: urlSchema.custom(appendSlash).required(),
  services: serverServicesSchema.default()
})

export const serversSchema = Joi.array()
  .items(serverSchema)
  .unique('name')
  .min(1)
  .required()

/**
 * @typedef {Object} ViewConfigObject
 * @property {Array<number>} center - The view center
 * @property {number} zoom - The view zoom
 * @property {string} projection - The view projection
 * @property {ExtentArray} extent
 */

/**
 *
 * @type {Joi.ObjectSchema<ViewConfigObject>}
 */
export const viewSchema = Joi.object({
  center: Joi.array()
    .default([0, 0])
    .items(Joi.number()),
  zoom: Joi.number()
    .default(0)
    .ruleset.min(0)
    .max(28),
  projection: Joi.string()
    .default('EPSG:3857')
    .regex(/^EPSG:\d+/),
  maxZoom: Joi.number().max(28).min(0).default(28),
  minZoom: Joi.number().max(28).min(0).default(0),
  extent: extentSchema
})

const projectLayerGroupSchema = Joi.object({
  id: Joi.string().default(() => v4()),
  label: Joi.string().default(Joi.ref('name')),
  name: Joi.string().required(),
  layers: projectGroupedLayersSchema
})

const projectLayerGroupsSchema = Joi.array().items(projectLayerGroupSchema).unique('name')

const baseMapsSchema = Joi.object({
  active: Joi.string().valid('osm', 'bing').optional(),
  osm: Joi.boolean().default(true),
  bing: Joi.object({
    culture: Joi.string().default('en-us'),
    imagerySet: Joi.string().valid(
      'RoadOnDemand',
      'Aerial',
      'AerialWithLabelsOnDemand',
      'CanvasDark').default('AerialWithLabelsOnDemand'),
    apiKey: Joi.string().required()
  }).optional()
})

/**
 * @typedef {Object} ProjectConfigObject
 * @property {string} title - The project title
 * @property {string} [description] - The project description
 * @property {string} [moreInfoUrl] - The project more info URL
 * @property {string} dataProjection - The map data-projection: Projection of input/output plain coordinates in properties, events and etc.
 * @property {Array<ProjectionSchemaObject>} projections,
 * @property {ViewConfigObject} view
 * @property {Array<ServerConfigObject>} servers
 * @property {Array<LayerConfigObject>} [layers]
 * @property [groupLayers]
 */

/**
 *
 * @type {Joi.ObjectSchema<ProjectConfig>}
 */
export const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  moreInfoUrl: urlSchema,
  projections: Joi.array().items(projectionSchema).default([]),
  dataProjection: Joi.string()
    .default('EPSG:3857')
    .regex(/EPSG:{1,2}\d+$/)
    .custom(stripCrsNamespace),
  view: viewSchema.default(),
  servers: serversSchema,
  layers: projectLayersSchema,
  groupLayers: projectLayerGroupsSchema,
  baseMaps: baseMapsSchema.default()
}).or('layers', 'groupLayers')
