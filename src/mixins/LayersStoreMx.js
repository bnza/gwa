import { mapGetters, mapMutations } from 'vuex'
import { LayerMutations } from '@/common/constants/mutations'

export default {
  computed: {
    ...mapGetters('layers', {
      getLayerData: 'get',
      layersConfigs: 'configs',
      getLayerProp: 'getProp',
      isActiveLayer: 'isActive',
      getReadyLayerConfigsByGroup: 'getReadyLayerConfigsByGroup'
    })
  },
  methods: {
    ...mapMutations('layers', {
      setActiveLayer: LayerMutations.SET_ACTIVE,
      setLayerProp: LayerMutations.SET_PROP
    })
  }
}
