<template>
  <v-main>
    <v-container fluid>
      <p>Requesting config... <span v-if="this.$store.state.config.raw" class="green--text">Done</span></p>
      <p v-if="this.$store.state.config.raw">Validating config... <span v-if="this.$store.state.config.valid" class="green--text">Done</span></p>
      <div v-if="error = this.$store.state.config.error">
          <div v-if="error.isJoi">
            <p v-for="(detail, index) in error.details" :key="index">
              <span class="red--text" >{{detail.path}}</span> - {{detail.type}} {{detail.message}}
            </p>
          </div>
          <div v-else-if="error.isAxiosError">
            <p v-if="error.response">
              Server responded with: [<span class="red--text" >{{error.response.status}}</span>] {{error.response.statusText}}
            </p>
            <p v-else-if="error.request">
              Server does not respond
            </p>
            <p v-else>
              {{error.message}}
            </p>
          </div>
          <p v-else>
            {{error.message}}
          </p>
        </div>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'AppConfigLoader',
  created () {
    this.$store.dispatch('config/loadConfig')
  }
}
</script>

<style scoped>

</style>
