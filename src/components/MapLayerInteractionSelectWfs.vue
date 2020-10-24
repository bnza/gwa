<template>
  <vl-interaction-select :layers="[activeLayer]" @select="emitSelectedJson"/>
</template>

<script>
export default {
  name: 'MapLayerInteractionSelectWfs',
  props: {
    activeLayer: {
      type: String,
      required: true
    }
  },
  methods: {
    emitSelectedJson (event) {
      this.$emit('select', { layer: this.activeLayer, feature: event.json })
    }
  }
}
</script>

<style scoped>

</style>
