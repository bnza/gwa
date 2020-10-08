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
    ...mapGetters('layers', ['getType']),
    featureType () {
      return this.getType(this.id)
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
