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

export const Mutations = Object.freeze({
  ClientMutations,
  ConfigMutations
})
