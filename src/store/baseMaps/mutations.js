import { BaseMapsMutations } from '@/common/constants/mutations'

export default {
  [BaseMapsMutations.SET_ACTIVE] (state, baseMap) {
    state.active = baseMap
  },
  [BaseMapsMutations.SET_OSM] (state, flag) {
    state.osm = flag
  },
  [BaseMapsMutations.SET_BING] (state, config) {
    state.bing = config
  }
}
