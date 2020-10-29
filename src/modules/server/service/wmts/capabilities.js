import { prop, path, head, map, partial, find, propEq } from 'ramda'
import { getRoot, getVersion, headProp, normalizeBboxOws } from '@/modules/server/service/capabilities'
import { WmtsVersions } from '@/common/constants/server'
import { Either } from 'monet'

const normalizeLayerInfo100 = raw => {
  return {
    name: headProp('ows:Identifier', raw),
    title: headProp('ows:Title', raw),
    abstract: prop('ows:Abstract', raw) ? headProp('ows:Abstract', raw) : '',
    extent: normalizeBboxOws(headProp('ows:WGS84BoundingBox', raw))
  }
}

const normalizeLayerInfo = (version, raw) => {
  const normalizers = {
    [WmtsVersions.v100]: normalizeLayerInfo100
  }
  return normalizers[version](raw)
}

const getRawLayers = parsed => prop(
  'Layer',
  head(path([getRoot(parsed), 'Contents'], parsed))
)

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
