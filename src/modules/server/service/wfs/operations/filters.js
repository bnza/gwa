import * as olFilters from 'ol/format/filter'
import { find, propEq, map, concat } from 'ramda'
import { not as notFilter, and as andFilter } from 'ol/format/filter'

export const operators = [
  {
    text: 'is null',
    filter: olFilters.isNull,
    types: ['string', 'number'],
    cardinality: 0,
    tagName: 'PropertyIsNull',
    options: [],
    parseExpressions: filter => [],
    parseOptions: filter => undefined,
    validate: filter => !!filter.propertyName
  },
  {
    text: 'equals',
    filter: olFilters.equalTo,
    types: ['string', 'number'],
    cardinality: 1,
    tagName: 'PropertyIsEqualTo',
    options: [false], // matchCase
    parseExpressions: filter => [filter.expression],
    parseOptions: filter => [filter.matchCase],
    validate: filter => !!filter.propertyName && !!filter.expressions.length
  }
]

export const findByTagName = tagName => find(propEq('tagName', tagName))(operators)

export const generateFilter = filterObject => {
  let filter = filterObject.operator.filter(
    filterObject.propertyName.just(),
    ...filterObject.expressions.slice(0, filterObject.operator.cardinality),
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
