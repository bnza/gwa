<template>
  <v-dialog
    :value="value"
    fullscreen
    :scrollable="false"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card flat>
      <v-toolbar
        dense
        dark
        flat
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Attribute table</v-toolbar-title>
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FeaturesFullScreenDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (flag) {
        this.$emit('update:value', flag)
      }
    }
  }
}
</script>

<style scoped>

</style>
