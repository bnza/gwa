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

export const SET_LAYER_STATE = 'setLayerState'
export const SET_PROP = 'setProp'
export const TOGGLE_PROP = 'toggleProp'
export const SET_CURRENT = 'setCurrent'

export const LayerMutations = Object.freeze({
  SET_LAYER_STATE,
  SET_PROP,
  TOGGLE_PROP,
  SET_CURRENT
})

export const Mutations = Object.freeze({
  ClientMutations,
  ConfigMutations,
  LayerMutations,
  ServerMutations
})
