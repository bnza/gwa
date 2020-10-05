<template>
  <v-list-item
    :class="{ current: isCurrentLayer(layer.id) }"
  >
    <v-list-item-action>
      <v-checkbox v-model="visible"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content
      @click="setCurrentLayer(layer.id)"
    >
      <v-list-item-title v-text="layer.label"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import LayersStoreMx from '@/mixins/LayersStoreMx'

export default {
  name: 'DrawerLayerListTile',
  mixins: [LayersStoreMx],
  props: {
    layer: {
      type: Object,
      required: true
    }
  },
  computed: {
    visible: {
      get () {
        return this.getLayerProp(this.layer.id, 'visible')
      },
      set (value) {
        this.setLayerProp({ id: this.layer.id, key: 'visible', value })
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
