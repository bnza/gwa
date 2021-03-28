<template>
  <component v-if="styleComponent" :is="styleComponent" v-bind="styleConfig.symbology"/>
</template>

<script>
import { capitalize } from '@/modules/utils'
import SimpleLayerStyle from '@/components/styles/SimpleLayerStyle'

export default {
  name: 'MapLayerStyleWfs',
  data () {
    return {
      styles: []
    }
  },
  props: {
    styleConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    SimpleLayerStyle
  },
  computed: {
    type () {
      return this.styleConfig.type || ''
    },
    styleComponent () {
      return `${capitalize(this.type)}LayerStyle`
    }
  }
}
</script>

<style scoped></style>
