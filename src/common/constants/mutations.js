export const SET_REQUEST_PENDING = 'setRequestPending'
export const SET_REQUEST_TERMINATED = 'setRequestTerminated'

export const ClientMutations = Object.freeze({
  SET_REQUEST_PENDING,
  SET_REQUEST_TERMINATED
})

export const SET_CONFIG = 'setConfig'
export const SET_RAW_CONFIG = 'setRawConfig'
export const SET_ERRORS = 'setErrors'

export const ConfigMutations = Object.freeze({
  SET_CONFIG,
  SET_RAW_CONFIG,
  SET_ERRORS
})

export const SET_SERVER_CAPABILITIES = 'setServerCapabilities'
export const SET_SERVICE_CAPABILITIES = 'setServiceCapabilities'

export const CapabilitiesMutations = Object.freeze({
  SET_SERVER_CAPABILITIES,
  SET_SERVICE_CAPABILITIES
})

export const ServerMutations = Object.freeze({
  CapabilitiesMutations
})

export const SET_SERVICE = 'setService'
export const SET_OPERATION = 'setOperation'
export const SET_PARAMETERS = 'setParameters'
export const LayersQueryMutations = Object.freeze({
  SET_SERVICE,
  SET_OPERATION,
  SET_PARAMETERS
})

export const INCREMENT_LOADED_LAYERS = 'incrementLoadedLayers'
export const SET_LAYER_STATE = 'setLayerState'
export const SET_PROP = 'setProp'
export const TOGGLE_PROP = 'toggleProp'
export const SET_ACTIVE = 'setActive'
export const SET_FEATURE_TYPE = 'setFeatureType'
export const SET_SELECTED_FEATURE = 'setSelectedFeature'
export const CLEAR_SELECTED_FEATURE = 'clearSelectedFeature'

export const LayerMutations = Object.freeze({
  Query: LayersQueryMutations,
  SET_LAYER_STATE,
  SET_PROP,
  TOGGLE_PROP,
  SET_ACTIVE,
  SET_FEATURE_TYPE,
  SET_SELECTED_FEATURE,
  CLEAR_SELECTED_FEATURE,
  INCREMENT_LOADED_LAYERS
})

export const SET_EXTENT = 'setExtent'
export const CLEAR_EXTENT = 'clearExtent'

export const ViewMutations = Object.freeze({
  SET_EXTENT,
  CLEAR_EXTENT
})

export const SET_OSM = 'setOsm'
export const SET_BING = 'setBing'

export const BaseMapsMutations = Object.freeze({
  SET_ACTIVE,
  SET_OSM,
  SET_BING
})

export const Mutations = Object.freeze({
  ClientMutations,
  ConfigMutations,
  LayerMutations,
  ServerMutations,
  ViewMutations,
  BaseMapsMutations
})
