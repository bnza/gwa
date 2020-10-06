<template>
  <v-card flat>
    <drawer-layer-list-tile
      v-for="layerConfig of layersConfigs"
      :config="layerConfig"
      :key="layerConfig.id"
    />
  </v-card>
</template>

<script>
import LayersStoreMx from '@/mixins/LayersStoreMx'
import DrawerLayerListTile from '@/components/DrawerLayerListTile'

export default {
  name: 'AppDrawerLayersList',
  mixins: [LayersStoreMx],
  components: {
    DrawerLayerListTile
  }
}
</script>

<style scoped></style>
