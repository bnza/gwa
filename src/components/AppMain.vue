<template>
  <app-config-manager />
</template>

<script>
import AppConfigManager from '@/components/AppConfigManager'
export default {
  name: 'AppMain',
  components: { AppConfigManager },
  props: {
    projectConfig: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
