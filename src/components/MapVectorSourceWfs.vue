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
import { WFS } from 'ol/format'
import { bbox as bboxFilter } from 'ol/format/filter'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import { get as getProj } from 'ol/proj'
import { registerProjection } from '@/modules/projections'
import { always, prop, identity } from 'ramda'
import { mapActions } from 'vuex'
import { Services } from '@/common/constants'
import WfsLayerMx from '@/mixins/WfsLayerMx'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'

export default {
  name: 'MapVectorSourceWfs',
  mixins: [WfsLayerMx, ProjectConfigMx],
  props: {
    config: {
      type: Object,
      required: true,
      validator: value => value.type === Services.wfs
    }
  },
  data () {
    return {
      projectionReady: false,
      wfsFormat: null
    }
  },
  computed: {
    loadingStrategy () {
      return bboxStrategy
    },
    projection () {
      return this.featureType.cata(always(''), prop('projection'))
    }
  },
  methods: {
    ...mapActions('client', ['fetch']),
    async loader (extent, projection, resolution) {
      const [ns, name] = this.data.config.name.split(':')
      const featureRequest = this.wfsFormat.writeGetFeature({
        featurePrefix: ns,
        featureTypes: [name],
        outputFormat: 'application/json',
        filter: bboxFilter(this.geometryName, extent, this.projection)
      })
      const data = await this.fetch(
        {
          method: 'post',
          headers: { 'Content-Type': 'text/xml' },
          url: `${this.data.server.config.baseUrl}wfs`,
          data: new XMLSerializer().serializeToString(featureRequest)
        }
      )
      return data.cata(() => {}, identity)
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
  },
  created () {
    this.wfsFormat = new WFS()
  }
}
</script>
