export default {
  unloadedServerCapabilities: (state, getters, rootState) => {
    return rootState.config.valid.servers.filter(
      server => !Object.prototype.hasOwnProperty.call(state, server.name)
    )
  }
}
