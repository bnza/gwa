<template>
  <v-navigation-drawer app width="400" clipped hide-overlay :value="visible">
    <v-card flat>
      <v-tabs v-model="currentTab" icons-and-text>
        <v-tab>
          Layers
          <v-icon>layers</v-icon>
        </v-tab>
        <v-tab>
          Table
          <v-icon>reorder</v-icon>
        </v-tab>
        <v-tab>
          Data
          <v-icon>article</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items :value="currentTab">
        <v-tab-item>
          <app-drawer-layers-list />
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>Layer attribute table</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>Item data</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { SET_VISIBLE_TAB } from '@/store/components/AppNavigationDrawer'
import AppDrawerLayersList from '@/components/AppDrawerLayersList'

export default {
  name: 'AppNavigationDrawer',
  components: {
    AppDrawerLayersList
  },
  computed: {
    ...mapState('components/AppNavigationDrawer', ['visible', 'visibleTab']),
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
    ...mapMutations('components/AppNavigationDrawer', [SET_VISIBLE_TAB])
  }
}
</script>

<style scoped></style>
