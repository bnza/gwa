<template>
  <vl-layer-group :id="name">
    <component
      v-for="layerConfig in members"
      :key="layerConfig.id"
      :is="getComponent(layerConfig)"
      :config="layerConfig"
      :id="layerConfig.id"
    />
  </vl-layer-group>
</template>

<script>
import { reverse } from 'ramda'
import { mapGetters } from 'vuex'
import MapLayerWfs from '@/components/MapLayerWfs'
import MapLayerWms from '@/components/MapLayerWms'
import MapLayerWmts from '@/components/MapLayerWmts'
export default {
  name: 'MapLayerGroup',
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    ...mapGetters('layers', ['getReadyLayerConfigsByGroup']),
    members () {
      return reverse(this.getReadyLayerConfigsByGroup(this.name))
    }
  },
  methods: {
    getComponent (layer) {
      return {
        wms: MapLayerWms,
        wfs: MapLayerWfs,
        wmts: MapLayerWmts
      }[layer.type]
    }
  }
}
</script>

<style scoped>

</style>
