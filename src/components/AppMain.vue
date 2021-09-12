<template>
  <div>
    <app-config-manager @layersSet="layersSet=true" :layersLoading.sync="layersLoading"/>
    <app-bar />
    <app-navigation-drawer :layers-set="layersSet"/>
      <v-main>
        <app-map :layers-ready="layersReady"/>
      </v-main>
    <app-footer :layers-loading="layersLoading"/>
  </div>
</template>

<script>
import AppConfigManager from '@/components/AppConfigManager'
import AppBar from '@/components/AppBar'
import AppFooter from '@/components/AppFooter'
import AppMap from '@/components/AppMap'
import AppNavigationDrawer from '@/components/AppNavigationDrawer'

export default {
  name: 'AppMain',
  components: { AppBar, AppConfigManager, AppFooter, AppMap, AppNavigationDrawer },
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
