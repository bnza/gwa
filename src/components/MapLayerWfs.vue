<template>
  <vl-layer-vector :visible="data.state.visible">
    <map-vector-source-wfs v-if="featureTypeReady" :config="config" />
  </vl-layer-vector>
</template>

<script>
import WfsLayerMx from '@/mixins/WfsLayerMx'
import MapVectorSourceWfs from '@/components/MapVectorSourceWfs'
export default {
  name: 'MapLayerWfs',
  mixins: [WfsLayerMx],
  components: {
    MapVectorSourceWfs
  }
}
</script>

<style scoped>

</style>
