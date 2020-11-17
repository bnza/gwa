export default {
  getParameters: (state) => ({ service, operation, id }) => {
    if (!Object.prototype.hasOwnProperty.call(state.parameters, service)) {
      throw new Error(`No such service "${service}"`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.parameters[service], operation)) {
      throw new Error(`No such operation "${service}/${operation}"`)
    }
    if (!Object.prototype.hasOwnProperty.call(state.parameters[service][operation], id)) {
      return false
    }
    return state.parameters[service][operation][id]
  }
}
