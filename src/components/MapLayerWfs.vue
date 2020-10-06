<template>
  <vl-layer-vector :visible="data.state.visible">
    <map-vector-source-wfs v-if="featureTypeReady" :config="config" />
    <map-layer-style-wfs :style-config="data.config.style" />
  </vl-layer-vector>
</template>

<script>
import WfsLayerMx from '@/mixins/WfsLayerMx'
import MapVectorSourceWfs from '@/components/MapVectorSourceWfs'
import MapLayerStyleWfs from '@/components/MapLayerStyleWfs'
export default {
  name: 'MapLayerWfs',
  mixins: [WfsLayerMx],
  components: {
    MapVectorSourceWfs,
    MapLayerStyleWfs
  }
}
</script>

<style scoped>

</style>
