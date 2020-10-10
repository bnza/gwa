import { find, includes, prop, identity, __ } from 'ramda'
import { Either } from 'monet'
import { GeometrySupportedTypes } from '@/common/constants'

/**
 *
 * @param {string} type
 * @return {Either<boolean,string>}
 */
export const getGmlBaseType = (type) => {
  return /^gml:.+/.test(type) ? Either.of(type.match(/^gml:(.+)/)[1]) : Either.left(false)
}

export const isSupportedGeometryType = (value) => {
  return getGmlBaseType(value).cata(identity, includes(__, GeometrySupportedTypes))
}
/**
 * Returns fist geometry type in a WfsDescribeFeatureTypeProperties list
 * @param {Array<WfsDescribeFeatureTypeProperties>} propertiesList
 * @return {string} The geometry field name
 */
export const findGeometryField = (propertiesList) => {
  const _properties = find(properties => isSupportedGeometryType(prop('type', properties)), propertiesList)
  return _properties?.name
}
