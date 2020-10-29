export const SET_COORDS = 'setCoords'

export const state = {
  coords: [0, 0]
}
export default {
  strict: true,
  namespaced: true,
  state,
  mutations: {
    [SET_COORDS] (state, coords) {
      state.coords = coords
    }
  }
}
