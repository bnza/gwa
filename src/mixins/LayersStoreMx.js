import { mapGetters, mapMutations } from 'vuex'
import { LayerMutations } from '@/common/constants/mutations'

export default {
  computed: {
    ...mapGetters('layers', {
      getLayerData: 'get',
      layersConfigs: 'configs',
      getLayerProp: 'getProp',
      isCurrentLayer: 'isCurrent'
    })
  },
  methods: {
    ...mapMutations('layers', {
      setCurrentLayer: LayerMutations.SET_CURRENT,
      setLayerProp: LayerMutations.SET_PROP
    })
  }
}
