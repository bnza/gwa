<template>
  <v-dialog
    :value="value"
    fullscreen
    :scrollable="false"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card flat>
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
  }
}
</script>

<style scoped>

</style>
