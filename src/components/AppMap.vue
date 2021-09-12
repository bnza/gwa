<template>
  <vl-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    :style="`height: ${height}px`"
    :data-projection="dataProjection"
    @pointermove="storePointerCoords"
  >
    <vl-view
      ref="view"
      :projection="dataProjection"
      :maxZoom="viewConfig.maxZoom"
      :minZoom="viewConfig.minZoom"
      :extent="extent"
      :zoom.sync="zoom"
      :center.sync="center"
      :rotation.sync="rotation"
    />
    <map-base-maps :state="$store.state.baseMaps" />
    <template v-if="layersReady">
      <map-layer-group
        v-for="group in reversedGroupLayers"
        :key="group.id"
        :id="group.name"
        :name="group.name"
      />
    </template>
    <map-layer-group v-if="layersReady" id="default" />
    <map-layer-interaction-select-wfs v-if="activeLayer" :active-layer="activeLayer" @select="setSelectedFeature"/>
  </vl-map>
</template>

<script>
import { reverse } from 'ramda'
import { mapState, mapGetters } from 'vuex'
import { getMapIntPixelHeight } from '@/modules/utils'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import MapBaseMaps from '@/components/MapBaseMaps'
import MapLayerGroup from '@/components/MapLayerGroup'
import MapLayerInteractionSelectWfs from '@/components/MapLayerInteractionSelectWfs'
import { ViewMutations, LayerMutations } from '@/common/constants/mutations'
import { SET_VISIBLE, SET_VISIBLE_TAB } from '@/store/components/AppNavigationDrawer'
import { SET_COORDS } from '@/store/components/AppMap'
import { DrawerTabs } from '@/common/constants'

export default {
  name: 'AppMap',
  mixins: [ProjectConfigMx],
  components: {
    MapBaseMaps,
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
  props: {
    layersReady: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('config', {
      config: 'valid'
    }),
    ...mapState('view', {
      fitExtent: 'extent'
    }),
    ...mapState('layers', {
      activeLayer: 'active'
    }),
    ...mapGetters('config', [
      'groupLayers'
    ]),
    reversedGroupLayers () {
      return reverse(this.groupLayers)
    },
    viewConfig () {
      return this.config.view
    }
  },
  methods: {
    onResize () {
      this.height = getMapIntPixelHeight(window.innerHeight)
    },
    setSelectedFeature (selected) {
      this.$store.commit(`layers/${LayerMutations.SET_SELECTED_FEATURE}`, selected)
      this.$store.commit(`components/AppNavigationDrawer/${SET_VISIBLE}`, true)
      this.$store.commit(`components/AppNavigationDrawer/${SET_VISIBLE_TAB}`, DrawerTabs.ITEM)
    },
    storePointerCoords ({ coordinate }) {
      this.$store.commit(`components/AppMap/${SET_COORDS}`, coordinate)
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
