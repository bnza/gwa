<template>
  <v-dialog
    max-width="200px"
    :value="value"
    persistent
    :scrollable="false"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card flat class="mx-auto">
      <v-toolbar
        color="red darken-2"
        dense
        dark
        flat
        :rounded="false"
      >
        <v-toolbar-title>Delete filter</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-6">
        <div class="text--primary">
          Delete filter entry?
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text outlined @click="close">Cancel</v-btn>
        <v-spacer />
        <v-btn text outlined color="red darken-2" @click="del">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FeaturesFilterDeleteDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('update:value', false)
    },
    del () {
      this.$emit('delete')
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
