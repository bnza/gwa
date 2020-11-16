import { BaseMapsMutations } from '@/common/constants/mutations'
import { head, filter } from 'ramda'

export default {
  setConfig ({ commit }, config) {
    if (Object.prototype.hasOwnProperty.apply(config, ['bing'])) {
      commit(BaseMapsMutations.SET_BING, config.bing)
    }
    if (Object.prototype.hasOwnProperty.apply(config, ['osm'])) {
      commit(BaseMapsMutations.SET_OSM, config.osm)
    }
    let active = config.active
    if (!active) {
      active = head(filter(key => key !== 'active', Object.keys(config)))
    }
    commit(BaseMapsMutations.SET_ACTIVE, active)
  }
}
