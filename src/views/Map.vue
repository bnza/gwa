<template>
    <app-main v-if="validConfig" :project-config="validConfig" />
    <app-config-loader v-else/>
</template>

<script>
import { mapState } from 'vuex'
import AppConfigLoader from '@/components/AppConfigLoader'
import AppMain from '@/components/AppMain'
export default {
  name: 'Home',
  components: {
    AppMain,
    AppConfigLoader
  },
  computed: {
    ...mapState('config', {
      validConfig: 'valid'
    })
  }

}
</script>
