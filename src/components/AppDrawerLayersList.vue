<template>
  <v-card flat>
    <v-list dense>
      <drawer-layer-list-tile
        v-for="layerConfig in defaultGroupMembers"
        :config="layerConfig"
        :key="layerConfig.id"
      />
      <v-list-group
        v-for="group in groupLayers"
        :key="group.id"
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ group.label }}</v-list-item-title>
        </template>
        <drawer-layer-list-tile
          v-for="layerConfig in group.layers"
          :config="layerConfig"
          :key="layerConfig.id"
        />
      </v-list-group>
      <drawer-base-maps-list />
    </v-list>
    <layer-info-dialog />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import LayersStoreMx from '@/mixins/LayersStoreMx'
import DrawerLayerListTile from '@/components/DrawerLayerListTile'
import DrawerBaseMapsList from '@/components/DrawerBaseMapsList'
import LayerInfoDialog from '@/components/LayerInfoDialog'

export default {
  name: 'AppDrawerLayersList',
  mixins: [LayersStoreMx],
  components: {
    DrawerLayerListTile,
    DrawerBaseMapsList,
    LayerInfoDialog
  },
  computed: {
    ...mapGetters('config', ['groupLayers']),
    defaultGroupMembers () {
      return this.getReadyLayerConfigsByGroup('default')
    }
  }
}
</script>

<style scoped></style>
