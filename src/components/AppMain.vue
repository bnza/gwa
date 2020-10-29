<template>
  <div>
    <app-config-manager @layersSet="layersSet=true"/>
    <app-bar />
    <app-navigation-drawer :layers-set="layersSet"/>
      <v-main>
        <app-map />
      </v-main>
    <app-footer />
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
      layersSet: false
    }
  }
}
</script>

<style scoped>

</style>
