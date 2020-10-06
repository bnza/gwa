import { compose, partial } from 'ramda'
import { Left } from 'monet'
import LayerMx from '@/mixins/LayerMx'
import { getFeatureTypeList, getFeatureType } from '@/modules/server/service/wfs/capabilities'

export default {
  mixins: [LayerMx],
  computed: {
    hasFeatureType () {
      return this.featureType.isRight()
    },
    featureType () {
      try {
        return this.service.capabilities.map(
          compose(
            partial(getFeatureType, [this.data.config.name]),
            getFeatureTypeList
          )
        )
      } catch (e) {
        return Left(e)
      }
    }
  }
}
