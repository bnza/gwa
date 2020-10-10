<template>
  <vl-source-tile-wms :projection="dataProjection" :layers="config.name" server-type="geoserver" :url="serviceUrl"/>
</template>

<script>
import { Services } from '@/common/constants'
import { getServiceUrl } from '@/modules/server/service'
import LayerMx from '@/mixins/LayerMx'
import ProjectConfigMx from '@/mixins/ProjectConfigMx'

export default {
  name: 'MapSourceImageWms',
  mixins: [ProjectConfigMx, LayerMx],
  props: {
    config: {
      type: Object,
      required: true,
      validator: value => value.type === Services.wms
    }
  },
  computed: {
    serviceUrl () {
      return getServiceUrl(this.data.server.config, Services.wms)
    }
  }
}
</script>

<style scoped>

</style>
