import { ViewMutations } from '@/common/constants/mutations'
import { transformWgs84Extent } from '@/modules/projections'

export default {
  fit: ({ commit, rootState }, { geometryOrExtent, options = {} }) => {
    commit(
      ViewMutations.SET_EXTENT,
      [
        transformWgs84Extent(geometryOrExtent, rootState.config.valid.dataProjection),
        options
      ])
  },
  fitLayer: ({ dispatch, rootGetters }, { id, options = {} }) => {
    const info = rootGetters['layers/getLayerInfo'](id)
    info.map(_info => dispatch('fit', { geometryOrExtent: _info.extent, options }))
  }
}
