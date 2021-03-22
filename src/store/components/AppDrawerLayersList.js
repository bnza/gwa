export const SET_ACTIVE_SHOW_LAYER_ID = 'setActiveShowInfoLayerId'

export const state = {
  activeShowInfoLayerId: ''
}
export default {
  strict: true,
  namespaced: true,
  state,
  mutations: {
    [SET_ACTIVE_SHOW_LAYER_ID] (state, id) {
      state.activeShowInfoLayerId = id
    }
  }
}
