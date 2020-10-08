import { map, head, prop, partial, concat, split, find, propEq } from 'ramda'
import { Either } from 'monet'
import { headProp, getRoot, getVersion } from '@/modules/server/service/capabilities'
import { WfsVersions } from '@/common/constants/server'
import { stripCrsNamespace } from '@/modules/utils'

/**
 *
 * @param {Object} parsed
 * @return {Array<Wfs100CapabilitiesFeatureConfigObject>}
 */
const getRawFeatureTypeList = parsed => prop(
  'FeatureType',
  head(
    prop('FeatureTypeList', (
      prop(getRoot(parsed), parsed))
    )
  )
)

/**
 *
 * @typedef {Object} LatLongBoundingBox100
 * @property {number} minx
 * @property {number} miny
 * @property {number} maxx
 * @property {number} maxy
 */

/**
 * @param {{$: LatLongBoundingBox100}} rawBbox
 * @return {ExtentArray}
 */
const normalizeBbox100 = rawBbox => {
  const bbox = prop('$', rawBbox)
  return map(Number, [bbox.minx, bbox.miny, bbox.maxx, bbox.maxy])
}

/**
 * {
 *   "ows:LowerCorner": ["-74.047185 40.679648"],
 *   "ows:UpperCorner": ["-74.047185 40.679648"],
 * }
 * @param {{'ows:LowerCorner': Array<string>, 'ows:UpperCorner': Array<string>}}rawBbox
 * @return {ExtentArray}
 */
const normalizeBbox110 = rawBbox => {
  return map(
    Number,
    concat(
      ...map(
        key => split(' ', headProp(key, rawBbox)),
        ['ows:LowerCorner', 'ows:UpperCorner']
      )
    )
  )
}

/**
 *
 * @typedef {Object} WfsCapabilitiesFeatureTypeConfigObject
 * @property {string} name
 * @property {string} [title]
 * @property {string} [abstract]
 * @property {string} projection
 * @property {ExtentArray} extent
 */

/**
 *  JSON parsed XML GetCapabilities response <FeatureTypeList> equivalent element (base)
 *  @typedef {Object} WfsBaseCapabilitiesFeatureConfigObject
 *  @property {Array<string>} Name
 *  @property {Array<string>} Title
 *  @property {Array<string>} Abstract
 */

/**
 *  JSON parsed XML GetCapabilities response <FeatureTypeList> equivalent element (WFS 1.0.0)
 *  @typedef {WfsBaseCapabilitiesFeatureConfigObject} Wfs100CapabilitiesFeatureConfigObject
 *  @property {Array<string>} SRS
 *  @property LatLongBoundingBox
 */

/**
 *
 * @param {Wfs100CapabilitiesFeatureConfigObject} raw
 * @return {WfsCapabilitiesFeatureTypeConfigObject}
 */
const normalizeFeatureType100 = raw => {
  return {
    name: headProp('Name', raw),
    title: headProp('Title', raw),
    abstract: headProp('Abstract', raw),
    projection: stripCrsNamespace(headProp('SRS', raw)),
    extent: normalizeBbox100(headProp('LatLongBoundingBox', raw))
  }
}

/**
 *  JSON parsed XML GetCapabilities response <FeatureTypeList> equivalent element (WFS 1.1.0)
 *  @typedef {WfsBaseCapabilitiesFeatureConfigObject} Wfs110CapabilitiesFeatureConfigObject
 *  @property {Array<string>} DefaultSRS
 *  @property "ows:WGS84BoundingBox"
 */

/**
 *
 * @param {Wfs110CapabilitiesFeatureConfigObject} raw
 * @return {WfsCapabilitiesFeatureTypeConfigObject}
 */
const normalizeFeatureType110 = raw => {
  return {
    name: headProp('Name', raw),
    title: headProp('Title', raw),
    abstract: headProp('Abstract', raw),
    projection: stripCrsNamespace(headProp('DefaultSRS', raw)),
    extent: normalizeBbox110(headProp('ows:WGS84BoundingBox', raw))
  }
}

/**
 *  JSON parsed XML GetCapabilities response <FeatureTypeList> equivalent element (WFS 1.1.0)
 *  @typedef {WfsBaseCapabilitiesFeatureConfigObject} Wfs200CapabilitiesFeatureConfigObject
 *  @property {Array<string>} DefaultCRS
 *  @property "ows:WGS84BoundingBox"
 */

/**
 *
 * @param {Wfs200CapabilitiesFeatureConfigObject} raw
 * @return {WfsCapabilitiesFeatureTypeConfigObject}
 */
const normalizeFeatureType200 = raw => {
  return {
    name: headProp('Name', raw),
    title: headProp('Title', raw),
    abstract: headProp('Abstract', raw),
    projection: stripCrsNamespace(headProp('DefaultCRS', raw)),
    extent: normalizeBbox110(headProp('ows:WGS84BoundingBox', raw))
  }
}

/**
 *
 * @param {WfsVersions} version
 * @param {WfsBaseCapabilitiesFeatureConfigObject} raw
 * @return {WfsCapabilitiesFeatureTypeConfigObject}
 */
const normalizeFeatureType = (version, raw) => {
  const normalizers = {
    [WfsVersions.v100]: normalizeFeatureType100,
    [WfsVersions.v110]: normalizeFeatureType110,
    [WfsVersions.v200]: normalizeFeatureType200
  }
  return normalizers[version](raw)
}

/**
 *
 * @param {WfsBaseCapabilitiesFeatureConfigObject} parsed
 * @return {Array<WfsCapabilitiesFeatureTypeConfigObject>}
 */
export const getFeatureTypeList = parsed => {
  const raws = getRawFeatureTypeList(parsed)
  const version = getVersion(parsed)
  return map(partial(normalizeFeatureType, [version]), raws)
}

/**
 *
 * @param {WfsBaseCapabilitiesFeatureConfigObject} featureTypeList
 * @param {string} name - The typename
 * @return {Either<string,WfsCapabilitiesFeatureTypeConfigObject>}
 */
export const getFeatureType = (name, featureTypeList) => {
  const featureType = find(propEq('name', name))(featureTypeList)
  if (!featureType) {
    return Either.left(`No such typename ${name}`)
  }
  return Either.of(featureType)
}
