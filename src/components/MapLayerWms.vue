<template>
  <vl-layer-tile
    v-if="serviceReady"
    :visible="data.state.visible"
    :id="config.id"
    extent-projection="EPSG:4326"
  >
    <map-source-image-wms :config="config" />
  </vl-layer-tile>
</template>

<script>
import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'
import MapSourceImageWms from '@/components/MapSourceImageWms'
export default {
  name: 'MapLayerWms',
  mixins: [LayerMx],
  components: {
    MapSourceImageWms
  },
  computed: {
    ...mapGetters('layers', ['getLayerInfo']),
    info () {
      return this.getLayerInfo(this.config.id)
    }
  }
}
</script>

<style scoped>

</style>
