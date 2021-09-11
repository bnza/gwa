<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title color="primary">Layers loading progress</v-card-title>
        <v-card-text>
          <v-row justify="center">
          <v-progress-linear
          :value="percent"
          height="25"
        >
          <strong>{{this.loaded}}/{{this.total}}</strong>
          </v-progress-linear>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppLayerLoaderDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('layers', { layers: 'states' }),
    ...mapState('layers', { loaded: 'loaded' }),
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

</style>
