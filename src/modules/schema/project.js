import Joi from 'joi'
import { v4 } from 'uuid'
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
    .regex(/^(\w+:)?\w+$/),
  opacity: opacitySchema,
  server: Joi.string().default('default'),
  type: Joi.string()
    .required()
    .valid('wfs', 'wms'),
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

/**
 *
 * @type {Joi.ArraySchema<>}
 */
const projectLayersSchema = Joi.array()
  .items(
    wfsLayerSchema.append({
      server: Joi.string()
        .default('default')
        .valid(
          Joi.in('/servers', {
            adjust: servers => servers.map(server => server.name)
          })
        )
    }),
    wmsLayerSchema.append({
      server: Joi.string()
        .default('default')
        .valid(
          Joi.in('/servers', {
            adjust: servers => servers.map(server => server.name)
          })
        )
    })
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

export const serverServicesSchema = Joi.object({
  wfs: serverWfsServicesSchema.default(),
  wms: serverWmsServicesSchema.default()
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
  extent: extentSchema
})

const projectLayerGroupSchema = Joi.object({
  label: Joi.string().default(Joi.ref('name')),
  name: Joi.string().required(),
  layers: projectLayersSchema
})

const projectLayerGroupsSchema = Joi.array().items(projectLayerGroupSchema)

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
  projections: Joi.array().items(projectionSchema),
  dataProjection: Joi.string()
    .default('EPSG:3857')
    .regex(/EPSG:{1,2}\d+$/)
    .custom(stripCrsNamespace),
  view: viewSchema.default(),
  servers: serversSchema,
  layers: projectLayersSchema,
  groupLayers: projectLayerGroupsSchema
}).or('layers', 'groupLayers')
