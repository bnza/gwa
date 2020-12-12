<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-card-title
        v-on="on"
      >{{ label }}</v-card-title>
    </template>
    {{ title }}
  </v-tooltip>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  name: 'LayerCardTitleTooltip'
}
</script>

<style scoped>

</style>
