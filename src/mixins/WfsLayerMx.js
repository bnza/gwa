import { mapGetters } from 'vuex'
import { prop, identity } from 'ramda'
import { findGeometryField } from '@/modules/layer/wfs'
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
    },
    geometryName () {
      return this.featureType.map(
        featureType => findGeometryField(prop('properties', featureType))
      ).cata(identity, identity)
    }
  }
}
