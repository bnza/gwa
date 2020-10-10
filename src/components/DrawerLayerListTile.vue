<template>
  <v-list-item
    :class="{ current: isCurrentLayer(config.id) }"
  >
    <v-list-item-action>
      <v-checkbox v-if="info.isRight()" v-model="visible"></v-checkbox>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="yellow darken-2"
            v-bind="attrs"
            v-on="on"
          >
            report_problem
          </v-icon>
        </template>
        <span>{{info.left()}}</span>
      </v-tooltip>
    </v-list-item-action>
    <v-list-item-content
      @click="status.isLeft() || setCurrentLayer(config.id)"
    >
      <v-list-item-title v-text="config.label"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'

export default {
  name: 'DrawerLayerListTile',
  mixins: [LayerMx],
  computed: {
    ...mapGetters('layers', ['getLayerInfo']),
    info () {
      return this.getLayerInfo(this.config.id)
    },
    visible: {
      get () {
        return this.getLayerProp(this.config.id, 'visible')
      },
      set (value) {
        this.setLayerProp({ id: this.config.id, key: 'visible', value })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.current {
  background-color: rgba(#fdd835, 0.25);
}
</style>
