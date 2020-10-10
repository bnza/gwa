import xml2js from 'xml2js'
import { Right, Left } from 'monet'
import { head, keys, prop, toPairs, find, values, map } from 'ramda'
import { GetCapabilitiesRootElements } from '@/common/constants/operations'
/**
 * @typedef {import('monet').Either} Either
 */

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
export const normalizeBboxObject = rawBbox => {
  const bbox = prop('$', rawBbox)
  return map(Number, [bbox.minx, bbox.miny, bbox.maxx, bbox.maxy])
}

/**
 * Returns the first object property key value
 * @template A
 * @param {Object<string,Array<A>>} object
 * @param {string} key
 * @return A
 */
export const headProp = (key, object) => head(prop(key, object))

/**
 *
 * @param {Either<Error, string>} either
 * @return {Either<Error, Object>}
 */
export const parseXmlEither = either => either.flatMap(parseXml)

/**
 *
 * @param {string} xml
 * @return {Either<Error, Object>}
 */
export const parseXml = xml => {
  let capabilities
  xml2js.parseString(xml, (error, result) => {
    capabilities = error ? Left(error) : Right(result)
  })
  return capabilities
}

export const getRoot = parsed => head(keys(parsed))

export const getVersion = parsed => {
  return prop('version', prop('$', prop(getRoot(parsed), parsed)))
}

/**
 *
 * @param parsed
 * @return {string} - The GetCapabilities service
 */
export const getService = parsed => {
  return head(
    find(([, rootsObject]) => {
      return find(
        /**
           * @param {string} root The root under test
           * @return {boolean}
           */
        root => (new RegExp(getRoot(parsed))).test(root),
        /**
           * @type {Array<string>} The root elements name of the given service
           */
        values(rootsObject))
    },
    /**
     * @type {Array}
     * @property 0 {string} service
     * @property 1 {Object<Versions,string>}
     */
    toPairs(GetCapabilitiesRootElements))
  )
}

export const parseXmlCapabilities = parseXml
