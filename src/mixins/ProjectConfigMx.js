import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('config', {
      projectConfig: 'valid'
    })
  }
}
