<script>
import { forEach } from 'ramda'
import { mapGetters, mapState } from 'vuex'
import { registerProjection } from '@/modules/projections'

export default {
  name: 'AppConfigManager',
  props: {
    layerLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('config', { config: 'valid' }),
    ...mapGetters('server/capabilities', ['unloadedServerCapabilities'])
  },
  render: () => null,
  created () {
    document.title = this.config.title
    forEach(registerProjection, this.config.projections)
    this.$store.dispatch('baseMaps/setConfig', this.config.baseMaps)
    this.$store.dispatch('server/capabilities/loadServersCapabilities').then(
      () => {
        this.$store.dispatch(('layers/setLayersStates'))
        this.$emit('layersSet')
        this.$emit('update:layerLoading', true)
        this.$store.dispatch('layers/loadConfigLayers').then(() => this.$emit('update:layerLoading', false))
      }
    )
  }
}
</script>
