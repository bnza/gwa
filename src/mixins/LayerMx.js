import LayersStoreMx from './LayersStoreMx'
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
    }
  }
}
