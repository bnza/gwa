<script>
import { prepend, map, filter } from 'ramda'
import { isSupportedGeometryType } from '@/modules/layer/wfs'

export default {
  name: 'FeaturesDataTableHeaders',
  props: {
    type: {
      type: Object,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  methods: {
    getHeader (type) {
      return {
        value: `properties.${type.name}`,
        text: type.name
      }
    },
    getHeaders () {
      return prepend(
        {
          value: 'id',
          text: 'id',
          sortable: false
        },
        map(this.getHeader, filter(prop => !isSupportedGeometryType(prop.type), this.type.properties)))
    },
    update () {
      this.$emit('update:headers', this.getHeaders())
    }
  },
  render: () => null,
  watch: {
    type: {
      handler: function () {
        this.update()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
