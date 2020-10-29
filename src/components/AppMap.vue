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
    <map-layer-interaction-select-wfs v-if="activeLayer" :active-layer="activeLayer" @select="setSelectedFeature"/>
  </vl-map>
</template>

<script>
import { mapState } from 'vuex'
import { getMapIntPixelHeight } from '@/modules/utils'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import MapLayerGroup from '@/components/MapLayerGroup'
import MapLayerInteractionSelectWfs from '@/components/MapLayerInteractionSelectWfs'
import { ViewMutations, LayerMutations } from '@/common/constants/mutations'
import { SET_VISIBLE_TAB } from '@/store/components/AppNavigationDrawer'
import { DrawerTabs } from '@/common/constants'

export default {
  name: 'AppMap',
  mixins: [ProjectConfigMx],
  components: {
    MapLayerGroup,
    MapLayerInteractionSelectWfs
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
    }),
    ...mapState('layers', {
      activeLayer: 'active'
    })
  },
  methods: {
    onResize () {
      this.height = getMapIntPixelHeight(window.innerHeight)
    },
    setSelectedFeature (selected) {
      this.$store.commit(`layers/${LayerMutations.SET_SELECTED_FEATURE}`, selected)
      this.$store.commit(`components/AppNavigationDrawer/${SET_VISIBLE_TAB}`, DrawerTabs.ITEM)
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
