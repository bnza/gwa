<template>
  <v-list-group>
    <template v-slot:activator>
      <v-list-item-title>Base Maps</v-list-item-title>
    </template>
    <v-list-item v-if="state.osm">
      <v-list-item-action>
        <v-checkbox
          :input-value="isVisible(BaseMaps.OSM)"
          @click="setVisible(BaseMaps.OSM)"
        />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="font-weight-light">
          Open Street Maps
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="state.bing.apiKey">
      <v-list-item-action>
        <v-checkbox
          :input-value="isVisible(BaseMaps.BING)"
          @click="setVisible(BaseMaps.BING)"
        />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="font-weight-light">
          Bing Maps
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
import { mapMutations } from 'vuex'
import { BaseMaps } from '@/common/constants'
export default {
  name: 'DrawerBaseMapsList',
  computed: {
    BaseMaps: () => BaseMaps,
    state () {
      return this.$store.state.baseMaps
    }
  },
  methods: {
    isVisible (key) {
      return this.state.active === key
    },
    setVisible (key) {
      key = this.isVisible(key) ? '' : key
      this.setActive(key)
    },
    ...mapMutations('baseMaps', ['setActive'])
  }
}
</script>

<style scoped>

</style>
