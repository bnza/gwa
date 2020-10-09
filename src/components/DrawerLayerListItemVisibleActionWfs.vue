<script>
import { Either } from 'monet'
import { mapGetters } from 'vuex'
export default {
  name: 'DrawerLayerListItemVisibleActionWfs',
  props: {
    status: {
      type: Either.fn.init,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('layers', ['getFeatureType']),
    featureType () {
      return this.getFeatureType(this.id)
    }
  },
  render: () => null,
  watch: {
    featureType: {
      handler (either) {
        this.$emit('update:status', either)
      }
    }
  }
}
</script>
