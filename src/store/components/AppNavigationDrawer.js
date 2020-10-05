export const SET_VISIBLE = 'setVisible'
export const TOGGLE_VISIBLE = 'toggleVisible'
export const SET_VISIBLE_TAB = 'setVisibleTab'

/**
 * @typedef {Object} State
 * @property {boolean} visible
 * @property {number} visibleTab
 */

/**
 *
 * @type {State}
 */
export const state = {
  visible: false,
  visibleTab: 0
}

export default {
  strict: true,
  namespaced: true,
  state,
  mutations: {
    /**
     *
     * @param {State} state
     * @param {boolean} flag
     */
    [SET_VISIBLE] (state, flag) {
      state.visible = flag
    },
    /**
     *
     * @param {State} state
     */
    [TOGGLE_VISIBLE] (state) {
      state.visible = !state.visible
    },
    /**
     *
     * @param {State} state
     * @param {int} index
     */
    [SET_VISIBLE_TAB] (state, index) {
      state.visibleTab = index
    }
  }
}
