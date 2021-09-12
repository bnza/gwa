<template>
  <v-footer>
    <div><p><span><v-icon>tonality</v-icon></span>{{config.dataProjection}}</p></div>
    <v-spacer></v-spacer>
      <v-progress-linear
        v-if="layersLoading"
        fixed
        striped
        :value="percent"
        height="20"
        style="margin-left: 200px; display: inline; float: right; max-width: 200px"
      >
        Loading layers:<strong> {{this.loaded}}/{{this.total}} </strong>
    </v-progress-linear>
    <div><p>{{cursorCoords[0].toFixed(6)}}, {{cursorCoords[1].toFixed(6)}}</p></div>
    <div><p>&copy; {{ new Date().getFullYear() }}</p></div>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppFooter',
  props: {
    layersLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('config', { config: 'valid' }),
    ...mapState('components/AppMap', { cursorCoords: 'coords' }),
    ...mapState('layers', {
      layers: 'states',
      loaded: 'loaded'
    }),
    total: function () {
      return Object.keys(this.layers).length
    },
    percent: function () {
      return Math.round((this.loaded / this.total + Number.EPSILON) * 100)
    }
  }
}
</script>

<style scoped>
 >>>p {
   margin: 0 1rem;
 }
</style>
