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
import { reverse } from 'ramda'
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
    ...mapGetters('layers', ['getReadyLayerConfigsByGroup']),
    members () {
      return reverse(this.getReadyLayerConfigsByGroup(this.group))
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
