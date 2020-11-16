<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppConfigManager',
  computed: {
    ...mapState('config', { config: 'valid' }),
    ...mapGetters('server/capabilities', ['unloadedServerCapabilities'])
  },
  render: () => null,
  created () {
    document.title = this.config.title
    this.$store.dispatch('baseMaps/setConfig', this.config.baseMaps)
    this.$store.dispatch('server/capabilities/loadServersCapabilities').then(
      () => {
        this.$store.dispatch(('layers/setLayersStates'))
        this.$emit('layersSet')
        this.$store.dispatch('layers/loadConfigLayers')
      }
    )
  }
}
</script>
