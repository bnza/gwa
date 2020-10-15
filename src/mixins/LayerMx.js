import LayersStoreMx from './LayersStoreMx'
import { Services } from '@/common/constants'
export default {
  mixins: [LayersStoreMx],
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    data () {
      return this.getLayerData(this.config)
    },
    service () {
      return this.data.server.services[this.config.type]
    },
    serviceReady () {
      return this.service.capabilities.isRight()
    },
    hasFeatures () {
      return this.config.type === Services.wfs
    },
    isActive () {
      return this.isActiveLayer(this.config.id)
    }
  }
}
