import { forEach, prop } from 'ramda'
import { LayersQueryMutations } from '@/common/constants/mutations'
import { Services } from '@/common/constants'
import { Operations } from '@/common/constants/operations'

export default {
  setUpParameters ({ commit }) {
    forEach(service => {
      commit(LayersQueryMutations.SET_SERVICE, { service })
      forEach(
        operation => commit(LayersQueryMutations.SET_OPERATION, { service, operation }),
        Object.values(prop(service, Operations))
      )
    },
    Object.values(Services)
    )
  }
}
