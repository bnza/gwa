<template>
  <v-list-item
    :class="{ current: isActive }"
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
      @click="info.isLeft() || setActiveLayer(config.id)"
    >
      <v-list-item-title class="font-weight-light">
        <span>
          <v-icon small color="grey lighten-1">{{ icon }}</v-icon>
        </span>  {{config.label}}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <drawer-layer-list-tile-actions-menu @show-layer-info="showLayerInfo" :id="config.id" :ready="info.isRight()" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Services } from '@/common/constants'
import { SET_ACTIVE_SHOW_LAYER_ID } from '@/store/components/AppDrawerLayersList'
import LayerMx from '@/mixins/LayerMx'
import DrawerLayerListTileActionsMenu from '@/components/DrawerLayerListTileActionsMenu'

export default {
  name: 'DrawerLayerListTile',
  mixins: [LayerMx],
  components: {
    DrawerLayerListTileActionsMenu
  },
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
    },
    icon () {
      let icon = ''
      switch (this.data.config.type) {
        case Services.wfs:
          icon = 'texture'
          break
        default:
          icon = 'photo'
      }
      return icon
    }
  },
  methods: {
    ...mapMutations('components/AppDrawerLayersList', [
      SET_ACTIVE_SHOW_LAYER_ID
    ]),
    showLayerInfo () {
      this[SET_ACTIVE_SHOW_LAYER_ID](this.config.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.current {
  background-color: rgba(#fdd835, 0.25);
}
</style>
