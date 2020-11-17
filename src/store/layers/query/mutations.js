import Vue from 'vue'
import { LayersQueryMutations } from '@/common/constants/mutations'

export default {
  [LayersQueryMutations.SET_SERVICE] (state, { service }) {
    if (!Object.prototype.hasOwnProperty.call(state.parameters, service)) {
      Vue.set(state.parameters, service, {})
    }
  },
  [LayersQueryMutations.SET_OPERATION] (state, { service, operation }) {
    if (!Object.prototype.hasOwnProperty.call(state.parameters, service)) {
      throw new Error(`No such service "${service}"`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.parameters[service], operation)) {
      Vue.set(state.parameters[service], operation, {})
    }
  },
  [LayersQueryMutations.SET_PARAMETERS] (state, { service, operation, id, parameters }) {
    if (!Object.prototype.hasOwnProperty.call(state.parameters, service)) {
      throw new Error(`No such service "${service}"`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.parameters[service], operation)) {
      throw new Error(`No such operation "${service}/${operation}"`)
    }
    Vue.set(state.parameters[service][operation], id, parameters)
  }
}
