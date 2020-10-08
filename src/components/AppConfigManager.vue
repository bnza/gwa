<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppConfigManager',
  computed: {
    ...mapGetters('server/capabilities', ['unloadedServerCapabilities'])
  },
  render: () => null,
  created () {
    this.$store.dispatch('server/capabilities/loadServersCapabilities').then(
      () => this.$store.dispatch('layers/loadConfigLayers')
    )
  }
}
</script>
