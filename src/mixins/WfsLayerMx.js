import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'

export default {
  mixins: [LayerMx],
  computed: {
    ...mapGetters('server/capabilities', ['getFeatureTypeList', 'getFeatureType']),
    featureTypeReady () {
      return this.featureType.isRight()
    },
    featureType () {
      return this.getFeatureType(this.data.config.server, this.data.config.name)
    }
  }
}
