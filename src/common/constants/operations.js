import { Services } from '@/common/constants/index'
import { Versions } from '@/common/constants/server'

export const GET_CAPABILITIES = 'GetCapabilities'

const WfsGetCapabilitiesRootElements = Object.freeze({
  [Versions.wfs.v100]: 'WFS_Capabilities',
  [Versions.wfs.v110]: 'wfs:WFS_Capabilities',
  [Versions.wfs.v110]: 'wfs:WFS_Capabilities'
})

export const GetCapabilitiesRootElements = Object.freeze({
  [Services.wfs]: WfsGetCapabilitiesRootElements
})

export const GET_FEATURE = 'GetFeature'

export const WfsOperations = Object.freeze({
  GET_CAPABILITIES,
  GET_FEATURE
})
