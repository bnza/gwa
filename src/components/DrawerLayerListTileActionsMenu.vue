<template>
  <div class="text-xs-center">
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn v-bind="attrs" :disabled="!ready" icon x-small color="primary" v-on="{ ...tooltip, ...menu }">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <span>More actions</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item link>
          <v-list-item-title @click="fitLayer" class="font-weight-light">Zoom to layer</v-list-item-title>
        </v-list-item>
<!--        <v-list-item link>
          <v-list-item-title class="font-weight-light">Show layer info</v-list-item-title>
        </v-list-item>-->
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: 'DrawerLayerListTileActionsMenu',
  props: {
    id: {
      type: String,
      required: true
    },
    ready: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    fitLayer () {
      this.$store.dispatch('view/fitLayer', { id: this.id })
    }
  }
}
</script>

<style scoped>

</style>
