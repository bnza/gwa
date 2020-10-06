<template>
    <vl-source-vector
      v-if="projectionReady"
      :attributions="data.config.attributions"
      :attributions-collapsible="true"
      :loader="loader"
      :loading-strategy="loadingStrategy"
      :projection="projection"
    />
</template>

<script>
import { bbox } from 'ol/loadingstrategy'
import { get as getProj } from 'ol/proj'
import { registerProjection } from '@/modules/projections'
import { always, prop } from 'ramda'
import { mapActions } from 'vuex'
import { Services } from '@/common/constants'
import WfsLayerMx from '@/mixins/WfsLayerMx'
import GetFeature from '@/modules/server/service/wfs/operations/GetFeature'

export default {
  name: 'MapVectorSourceWfs',
  mixins: [WfsLayerMx],
  props: {
    config: {
      type: Object,
      required: true,
      validator: value => value.type === Services.wfs
    }
  },
  data () {
    return {
      projectionReady: false
    }
  },
  computed: {
    loadingStrategy () {
      return bbox
    },
    projection () {
      return this.featureType.cata(always(''), prop('projection'))
    }
  },
  methods: {
    ...mapActions('client', ['fetch']),
    async loader () {
      const options = {
        typename: this.data.config.name,
        version: this.service.version
      }
      if (this.projection !== this.dataProjection) {
        options.srsName = this.dataProjection
      }
      const data = await this.fetch(
        GetFeature.getRequestConfig(this.data.server.config, options)
      )
      return data.right()
    }
  },
  watch: {
    projection: {
      handler: async function (code) {
        if (!code) {
          this.projectionReady = false
          return
        }
        if (!getProj(code)) {
          await registerProjection({ code }, this.fetch)
        }
        this.projectionReady = true
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
