<template>
  <v-app-bar
    app
    color="primary"
    dark
    dense
    flat
    clipped-left
    @click="toggleNavigationDrawer"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="hasMoreInfo" icon>
      <v-icon>mdi-info</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import { TOGGLE_VISIBLE } from '@/store/components/AppNavigationDrawer'

export default {
  name: 'AppBar',
  mixins: [ProjectConfigMx],
  computed: {
    title () {
      return this.projectConfig.title
    },
    hasMoreInfo () {
      return !!(this.projectConfig.moreInfoUrl || this.projectConfig.description)
    }
  },
  methods: {
    ...mapMutations('components/AppNavigationDrawer', {
      toggleNavigationDrawer: TOGGLE_VISIBLE
    })
  }
}
</script>

<style scoped></style>
