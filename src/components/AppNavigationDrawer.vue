<template>
  <v-navigation-drawer
    mobile-breakpoint="600"
    app
    :width="$vuetify.breakpoint.mdAndDown ? 300 : 400"
    clipped
    hide-overlay
    :value="visible"
  >
    <v-card flat>
      <v-tabs v-model="currentTab" @change="setActiveTab(DrawerTabs.LAYERS)" icons-and-text>
        <v-tab>
          Layers
          <v-icon>layers</v-icon>
        </v-tab>
        <v-tab @change="setActiveTab(DrawerTabs.TABLE)" v-if="activeLayerHasFeatures">
          Table
          <v-icon>reorder</v-icon>
        </v-tab>
        <v-tab @change="setActiveTab(DrawerTabs.ITEM)" v-if="hasSelectedFeature">
          Data
          <v-icon>article</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items :value="currentTab">
        <v-tab-item>
          <app-drawer-layers-list v-if="layersSet"/>
        </v-tab-item>
        <v-tab-item v-if="activeLayerHasFeatures" >
            <features-data-card :id="activeLayer" />
        </v-tab-item>
        <v-tab-item v-if="hasSelectedFeature">
            <feature-data-card />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { DrawerTabs } from '@/common/constants'
import { SET_VISIBLE_TAB } from '@/store/components/AppNavigationDrawer'
import AppDrawerLayersList from '@/components/AppDrawerLayersList'
import FeaturesDataCard from '@/components/FeaturesDataCard'
import FeatureDataCard from '@/components/FeatureDataCard'

export default {
  name: 'AppNavigationDrawer',
  components: {
    AppDrawerLayersList,
    FeaturesDataCard,
    FeatureDataCard
  },
  props: {
    layersSet: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      activeTab: DrawerTabs.LAYERS
    }
  },
  computed: {
    ...mapState('components/AppNavigationDrawer', ['visible', 'visibleTab']),
    ...mapState('layers', { activeLayer: 'active' }),
    ...mapGetters('layers', ['activeLayerHasFeatures', 'hasSelectedFeature']),
    DrawerTabs: () => DrawerTabs,
    currentTab: {
      get () {
        return this.visibleTab
      },
      set (value) {
        this[SET_VISIBLE_TAB](value)
      }
    }
  },
  methods: {
    ...mapMutations('components/AppNavigationDrawer', [SET_VISIBLE_TAB]),
    setActiveTab (tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped></style>
