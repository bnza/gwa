import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'

export default {
  mixins: [LayerMx],
  computed: {
    ...mapGetters('layers', ['getType']),
    featureTypeReady () {
      return this.featureType.isRight()
    },
    featureType () {
      return this.getType(this.config.id)
    }
  }
}
