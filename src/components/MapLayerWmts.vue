<template>
  <vl-layer-tile
    v-if="serviceReady && wmtsOptions"
    :visible="data.state.visible"
    :id="config.id"
    extent-projection="EPSG:4326"
    @mounted="onWmtsLayerMounted"
  >
  </vl-layer-tile>
</template>

<script>
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import { mapGetters } from 'vuex'
import LayerMx from '@/mixins/LayerMx'
import { getServiceUrl } from '@/modules/server/service'
import { Services } from '@/common/constants'
export default {
  name: 'MapLayerWmts',
  mixins: [LayerMx],
  data () {
    return {
      wmtsOptions: null
    }
  },
  computed: {
    ...mapGetters('layers', ['getLayerInfo']),
    ...mapGetters('server', { getServer: 'get' }),
    info () {
      return this.getLayerInfo(this.config.id)
    },
    getCapabilitiesUrl () {
      return `${this.url}?request=getCapabilities`
    },
    url () {
      const server = this.getServer(this.config.server)
      return getServiceUrl(server.config, Services.wmts)
    }
  },
  mounted () {
    const parser = new WMTSCapabilities()
    fetch(this.getCapabilitiesUrl)
      .then(response => response.text())
      .then(text => {
        const capabilities = parser.read(text)
        const options = optionsFromCapabilities(
          capabilities,
          {
            layer: this.config.name,
            matrixSet: 'EPSG:4326'
          }
        )
        this.wmtsOptions = options

        return options
      })
  },
  methods: {
    onWmtsLayerMounted (layer) {
      layer.$layer.setSource(new WMTS(this.wmtsOptions))
    }
  }
}
</script>

<style scoped>

</style>
