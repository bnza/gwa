import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'

export default {
  mixins: [LayerMx],
  computed: {
    ...mapGetters('layers', ['getFeatureType']),
    featureTypeReady () {
      return this.featureType.isRight()
    },
    featureType () {
      return this.getFeatureType(this.config.id)
    }
  }
}
