<template>
  <div>
    <app-config-manager />
    <app-bar />
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

export default {
  name: 'AppMain',
  components: { AppBar, AppConfigManager, AppFooter, AppMap }
}
</script>

<style scoped>

</style>
