<template>
  <vl-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    :style="`height: ${height}px`"
  >
    <vl-view
      :extent="extent"
      :zoom.sync="zoom"
      :center.sync="center"
      :rotation.sync="rotation"
    />
    <vl-layer-tile id="osm">
      <vl-source-osm />
    </vl-layer-tile>
    <map-layer-group id="default" />
  </vl-map>
</template>

<script>
import { getMapIntPixelHeight } from '@/modules/utils'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import MapLayerGroup from '@/components/MapLayerGroup'

export default {
  name: 'AppMap',
  mixins: [ProjectConfigMx],
  components: {
    MapLayerGroup
  },
  data () {
    return {
      height: 400,
      zoom: 6,
      center: [0, 0],
      rotation: 0,
      extent: null
    }
  },
  methods: {
    onResize () {
      this.height = getMapIntPixelHeight(window.innerHeight)
    }
  },
  created () {
    Object.assign(this, {
      extent: this.projectConfig.view.extent,
      center: this.projectConfig.view.center,
      zoom: this.projectConfig.view.zoom
    })
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  beforeDestroy () {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped></style>
