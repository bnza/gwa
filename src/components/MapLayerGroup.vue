<template>
  <vl-layer-group :id="group">
    <component
      v-for="layerConfig in members"
      :key="layerConfig.id"
      :is="getComponent(layerConfig)"
      :config="layerConfig"
    />
  </vl-layer-group>
</template>

<script>
import { mapGetters } from 'vuex'
import MapLayerWfs from '@/components/MapLayerWfs'
export default {
  name: 'MapLayerGroup',
  props: {
    group: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    ...mapGetters('config', ['getLayersByGroup']),
    members () {
      return this.getLayersByGroup(this.group)
    }
  },
  methods: {
    getComponent (layer) {
      return {
        wfs: MapLayerWfs
      }[layer.type]
    }
  }
}
</script>

<style scoped>

</style>
