<template>
  <div>
    <app-config-manager @layersSet="layersSet=true" :layersLoading.sync="layersLoading"/>
    <app-bar />
    <app-layer-loader-dialog :value="layersLoading" />
    <app-navigation-drawer :layers-set="layersSet"/>
      <v-main>
        <app-map :layersReady="layersReady"/>
      </v-main>
    <app-footer />
  </div>
</template>

<script>
import AppConfigManager from '@/components/AppConfigManager'
import AppBar from '@/components/AppBar'
import AppFooter from '@/components/AppFooter'
import AppLayerLoaderDialog from '@/components/AppLayerLoaderDialog'
import AppMap from '@/components/AppMap'
import AppNavigationDrawer from '@/components/AppNavigationDrawer'

export default {
  name: 'AppMain',
  components: { AppBar, AppConfigManager, AppFooter, AppMap, AppNavigationDrawer, AppLayerLoaderDialog },
  data () {
    return {
      layersSet: false,
      layersLoading: false
    }
  },
  computed: {
    layersReady () {
      return this.layersSet && !this.layersLoading
    }
  }
}
</script>

<style scoped>

</style>
