<template>
    <vl-source-vector
      ref="vlSource"
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
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import { get as getProj } from 'ol/proj'
import { registerProjection } from '@/modules/projections'
import { always, prop, identity } from 'ramda'
import { mapActions, mapGetters } from 'vuex'
import { Services } from '@/common/constants'
import { generateBboxFilter } from '@/modules/server/service/wfs/operations/filters'
import WfsLayerMx from '@/mixins/WfsLayerMx'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import { WfsOperations } from '@/common/constants/operations'

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
      wfsFormat: null,
      loaderParams: [],
      features: []
    }
  },
  computed: {
    ...mapGetters('layers/query', {
      getQueryParameters: 'getParameters'
    }),
    loadingStrategy () {
      return bboxStrategy
    },
    projection () {
      return this.featureType.cata(always(''), prop('projection'))
    },
    filters () {
      const parameters = this.getQueryParameters({
        service: Services.wfs,
        operation: WfsOperations.GET_FEATURE,
        id: this.config.id
      })
      return parameters ? parameters.filter : []
    }
  },
  methods: {
    ...mapActions('client', ['fetch']),
    async loader (extent, projection, resolution) {
      this.loaderParams = arguments
      const [ns, name] = this.data.config.name.split(':')
      const featureRequest = this.wfsFormat.writeGetFeature({
        featurePrefix: ns,
        featureTypes: [name],
        outputFormat: 'application/json',
        filter: generateBboxFilter(this.filters, this.geometryName, extent, this.projection) // bboxFilter(this.geometryName, extent, this.projection)
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
    },
    filters: {
      handler: function (filters, old) {
        this.$refs.vlSource.clear()
        this.$refs.vlSource.wrapLoaderFunc(this.loader)(...this.loaderParams)
      }
    }
  },
  created () {
    this.wfsFormat = new WFS()
  }
}
</script>
