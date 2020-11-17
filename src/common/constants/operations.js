import { Services } from '@/common/constants/index'
import { Versions } from '@/common/constants/server'

export const GET_CAPABILITIES = 'GetCapabilities'

const WfsGetCapabilitiesRootElements = Object.freeze({
  [Versions.wfs.v100]: 'WFS_Capabilities',
  [Versions.wfs.v110]: 'wfs:WFS_Capabilities',
  [Versions.wfs.v200]: 'wfs:WFS_Capabilities'
})

const WmsGetCapabilitiesRootElements = Object.freeze({
  [Versions.wms.v110]: 'WMT_MS_Capabilities',
  [Versions.wms.v111]: 'WMT_MS_Capabilities',
  [Versions.wms.v130]: 'WMS_Capabilities'
})

export const GetCapabilitiesRootElements = Object.freeze({
  [Services.wfs]: WfsGetCapabilitiesRootElements,
  [Services.wms]: WmsGetCapabilitiesRootElements
})

export const GET_FEATURE = 'GetFeature'
export const DESCRIBE_FEATURE_TYPE = 'DescribeFeatureType'

export const WfsOperations = Object.freeze({
  GET_CAPABILITIES,
  GET_FEATURE,
  DESCRIBE_FEATURE_TYPE
})

export const WmsOperations = Object.freeze({})
export const WmtsOperations = Object.freeze({})

export const Operations = Object.freeze({
  [Services.wfs]: WfsOperations,
  [Services.wms]: WmsOperations,
  [Services.wmts]: WmtsOperations
})
