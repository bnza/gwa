<template>
  <v-footer>
    <div><p><span><v-icon>tonality</v-icon></span>{{config.dataProjection}}</p></div>
    <v-spacer></v-spacer>
    <div><p>{{cursorCoords[0].toFixed(6)}}, {{cursorCoords[1].toFixed(6)}}</p></div>
    <div><p>&copy; {{ new Date().getFullYear() }}</p></div>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppFooter',
  computed: {
    ...mapState('config', { config: 'valid' }),
    ...mapState('components/AppMap', { cursorCoords: 'coords' })
  }
}
</script>

<style scoped>
 >>>p {
   margin: 0 1rem;
 }
</style>
