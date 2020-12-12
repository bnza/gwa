import * as olFilters from 'ol/format/filter'
import { find, propEq, map, concat } from 'ramda'
import { not as notFilter, and as andFilter } from 'ol/format/filter'

const LIKE_WILDCARD = '%'
const LIKE_SINGLE_CHAR = '.'
const LIKE_ESCAPE_CHAR = '!'
const CASE_SENSITIVE = true
const CASE_INSENSITIVE = false

export const operators = [
  {
    text: 'text contains',
    filter: olFilters.like,
    types: ['string'],
    cardinality: 1,
    tagName: 'PropertyIsLike',
    options: [LIKE_WILDCARD, LIKE_SINGLE_CHAR, LIKE_ESCAPE_CHAR, CASE_INSENSITIVE],
    parseExpressions: filter => {
      // TODO escape special chars
      return filter.length ? [`${LIKE_WILDCARD}${filter[0]}${LIKE_WILDCARD}`] : undefined
    },
    validate: filter => !!filter.propertyName && !!filter.expressions.length
  },
  {
    text: 'is null',
    filter: olFilters.isNull,
    types: ['string', 'number'],
    cardinality: 0,
    tagName: 'PropertyIsNull',
    options: [],
    parseExpressions: filter => [],
    validate: filter => !!filter.propertyName
  },
  {
    text: 'equals',
    filter: olFilters.equalTo,
    types: ['string', 'number'],
    cardinality: 1,
    tagName: 'PropertyIsEqualTo',
    options: [CASE_SENSITIVE],
    parseExpressions: filter => filter,
    validate: filter => !!filter.propertyName && !!filter.expressions.length
  }
]

export const findByTagName = tagName => find(propEq('tagName', tagName))(operators)

export const generateFilter = filterObject => {
  const expressions = filterObject.operator.parseExpressions(
    filterObject.expressions.slice(0, filterObject.operator.cardinality)
  )
  let filter = filterObject.operator.filter(
    filterObject.propertyName.just(),
    ...expressions,
    ...filterObject.operator.options
  )
  if (filterObject.negate) {
    filter = notFilter(filter)
  }
  return filter
}

export const generateFilters = filterObjects => map(filterObject => generateFilter(filterObject), filterObjects)

const _generateAndFilter = filters => {
  if (!filters.length) {
    return null
  }
  if (filters.length === 1) {
    return filters[0]
  }
  return andFilter(...filters)
}
export const generateAndFilter = filterObjects => {
  const filters = generateFilters(filterObjects)
  return _generateAndFilter(filters)
}

export const generateBboxFilter = (filterObjects, geometryName, extent, projection) => {
  const filters = concat(generateFilters(filterObjects), [olFilters.bbox(geometryName, extent, projection)])
  return _generateAndFilter(filters)
}
