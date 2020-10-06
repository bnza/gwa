import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('config', {
      projectConfig: 'valid'
    }),
    dataProjection () {
      return this.projectConfig.dataProjection
    }
  }
}
