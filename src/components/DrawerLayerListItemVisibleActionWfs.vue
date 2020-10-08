<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DrawerLayerListItemAction',
  props: {
    status: {
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('layers', ['getType']),
    featureType () {
      return this.getType(this.config.id)
    }
  },
  render: () => null,
  watch: {
    featureType: {
      handler (either) {
        this.$emit('update:status', either)
      },
      immediate: true
    }
  }
}
</script>
