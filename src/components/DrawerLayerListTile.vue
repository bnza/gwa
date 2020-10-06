<template>
  <v-list-item
    :class="{ current: isCurrentLayer(config.id) }"
  >
    <v-list-item-action>
      <v-checkbox v-model="visible"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content
      @click="setCurrentLayer(config.id)"
    >
      <v-list-item-title v-text="config.label"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import LayerMx from '@/mixins/LayerMx'

export default {
  name: 'DrawerLayerListTile',
  mixins: [LayerMx],
  computed: {
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
