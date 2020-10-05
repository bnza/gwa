
export default {
  configs: (state, getters, rootState) => {
    return rootState.config.valid.layers
  },
  getConfig: (state, getters) => id => getters.configs.find(layerConfig => layerConfig.id === id)
}
