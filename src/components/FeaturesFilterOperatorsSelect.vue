<script>
import { filter, includes } from 'ramda'
import { operators } from '@/modules/server/service/wfs/operations/filters'

const filterOperands = type =>
  filter(
    operator =>
      includes(
        type,
        operator.types
      ),
    operators
  )

export default {
  name: 'FeaturesFilterOperatorsSelect',
  props: {
    propertyType: {
      type: Object,
      required: true
    },
    operators: {
      type: Array,
      required: true
    }
  },
  render: () => null,
  watch: {
    operators: {
      handler: function (operators) {
        if (!operators.length) {
          this.$emit('update:operators', filterOperands(this.propertyType.localType))
        }
      },
      immediate: true
    }
  }
}
</script>
