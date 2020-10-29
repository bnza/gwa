import AppMap from '@/store/components/AppMap'
import AppNavigationDrawer from './AppNavigationDrawer'

/**
 * @typedef {Object} State
 */

/**
 *
 * @type {State}
 */
export const state = {}

export default {
  strict: true,
  namespaced: true,
  state,
  modules: {
    AppMap,
    AppNavigationDrawer
  }
}
