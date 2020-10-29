<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppConfigManager',
  computed: {
    ...mapGetters('server/capabilities', ['unloadedServerCapabilities'])
  },
  render: () => null,
  created () {
    document.title = this.$store.state.config.valid.title
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
