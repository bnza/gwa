<template>
  <vl-layer-group>
    <vl-layer-tile
      id="osm"
      v-if="state.osm"
      :visible="state.active === BaseMaps.OSM"
    >
      <vl-source-osm />
    </vl-layer-tile>
    <vl-layer-tile
      id="bing"
      v-if="state.bing.apiKey"
      :visible="state.active === BaseMaps.BING"
    >
      <vl-source-bingmaps
        :api-key="state.bing.apiKey"
        :imagery-set="state.bing.imagerySet"
        :culture="state.bing.culture"
      />
    </vl-layer-tile>
  </vl-layer-group>
</template>

<script>
import { BaseMaps } from '@/common/constants'

export default {
  name: 'MapBaseMaps',
  props: {
    state: {
      type: Object,
      required: true
    }
  },
  computed: {
    BaseMaps: () => BaseMaps
  },
  methods: {
    isActive (key) {
      return this.state.active === key
    }
  }
}
</script>

<style scoped>

</style>
