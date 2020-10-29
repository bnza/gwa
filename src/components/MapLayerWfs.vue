<template>
  <vl-layer-vector
    v-if="featureTypeReady"
    :visible="data.state.visible"
    :id="config.id"
    :extent="wgs84Extent"
    extent-projection="EPSG:4326"
  >
    <map-vector-source-wfs :config="config" />
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
