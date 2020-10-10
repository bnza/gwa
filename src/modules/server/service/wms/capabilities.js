import { find, map, partial, prop, propEq } from 'ramda'
import { Either } from 'monet'
import { headProp, getRoot, getVersion, normalizeBboxObject } from '@/modules/server/service/capabilities'
import { WmsVersions } from '@/common/constants/server'
import { stripCrsNamespace } from '@/modules/utils'

const normalizeBbox110 = normalizeBboxObject

const getRawLayers = parsed => prop(
  'Layer',
  headProp('Layer',
    headProp('Capability', (
      prop(getRoot(parsed), parsed))
    )
  )
)

const normalizeLayerInfo110 = raw => {
  return {
    name: headProp('Name', raw),
    title: headProp('Title', raw),
    abstract: headProp('Abstract', raw),
    projection: stripCrsNamespace(headProp('SRS', raw)),
    extent: normalizeBbox110(headProp('LatLonBoundingBox', raw))
  }
}

const normalizeLayerInfo130 = raw => {
  return {
    name: headProp('Name', raw),
    title: headProp('Title', raw),
    abstract: headProp('Abstract', raw),
    projection: stripCrsNamespace(headProp('CRS', raw)),
    extent: normalizeBbox110(headProp('BoundingBox', raw))
  }
}

const normalizeLayerInfo = (version, raw) => {
  const normalizers = {
    [WmsVersions.v111]: normalizeLayerInfo110,
    [WmsVersions.v110]: normalizeLayerInfo110,
    [WmsVersions.v130]: normalizeLayerInfo130
  }
  return normalizers[version](raw)
}

export const getLayersInfos = parsed => {
  const raws = getRawLayers(parsed)
  const version = getVersion(parsed)
  return map(partial(normalizeLayerInfo, [version]), raws)
}

export const getLayerInfo = (name, layers) => {
  const layer = find(propEq('name', name))(layers)
  if (!layer) {
    return Either.left(`No such typename ${name}`)
  }
  return Either.of(layer)
}
