<template>
  <vl-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    :style="`height: ${height}px`"
  >
    <vl-view
      ref="view"
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
import { mapState } from 'vuex'
import { getMapIntPixelHeight } from '@/modules/utils'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import MapLayerGroup from '@/components/MapLayerGroup'
import { ViewMutations } from '@/common/constants/mutations'

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
  computed: {
    ...mapState('view', {
      fitExtent: 'extent'
    })
  },
  methods: {
    onResize () {
      this.height = getMapIntPixelHeight(window.innerHeight)
    }
  },
  watch: {
    fitExtent (args) {
      if (!args || (Array.isArray(args) && !args.length)) {
        return
      }
      this.$refs.view.fit(...args)
      this.$store.commit(`view/${ViewMutations.CLEAR_EXTENT}`)
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
