<template>
<!-- <vl-source-wmts format="image/png" :projection="dataProjection" :layer-name="config.name" style-name="" matrix-set="EPSG:4326" :url="url" :extent="extent"/>-->
</template>

<script>
import { mapGetters } from 'vuex'
import { Services } from '@/common/constants'
import { getServiceUrl } from '@/modules/server/service'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'
import LayerMx from '@/mixins/LayerMx'

export default {
  name: 'MapSourceWmts',
  mixins: [ProjectConfigMx, LayerMx],
  props: {
    config: {
      type: Object,
      required: true,
      validator: value => value.type === Services.wmts
    }
  },
  computed: {
    ...mapGetters('server', { getServer: 'get' }),
    getCapabilitiesUrl () {
      return `${this.url}?getCapabilities`
    },
    url () {
      const server = this.getServer(this.config.server)
      return getServiceUrl(server.config, Services.wmts)
    },
    extent () {
      console.log(this.wgs84Extent)
      return this.wgs84Extent
    }
  }
}
</script>

<style scoped>

</style>
