<template>
    <vl-source-vector
      v-if="projectionReady"
      :attributions="layer.config.attributions"
      :attributions-collapsible="true"
      :loading-strategy="loadingStrategy"
      :projection="projection"
    />
</template>

<script>
import { bbox } from 'ol/loadingstrategy'
import { Services } from '@/common/constants'
import WfsLayerMx from '@/mixins/WfsLayerMx'

export default {
  name: 'MapVectorSourceWfs',
  mixins: [WfsLayerMx],
  props: {
    config: {
      type: Object,
      required: true,
      validator: value => value.type === Services.wfs
    }
  },
  data () {
    return {
      projectionReady: false
    }
  },
  computed: {
    loadingStrategy () {
      return bbox
    }
  }
}
</script>

<style scoped>

</style>
