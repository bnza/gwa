<template>
  <component :is="component" :status.sync="chainStatus" :config="config" />
</template>
<script>
import { Services } from '@/common/constants'
import DrawerLayerListItemVisibleActionWfs from '@/components/DrawerLayerListItemVisibleActionWfs'

export default {
  name: 'DrawerLayerListItemVisibleAction',
  props: {
    status: {
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    chainStatus: {
      get () {
        return this.status
      },
      set (value) {
        this.$emit('update:status', value)
      }
    },
    component () {
      return {
        [Services.wfs]: DrawerLayerListItemVisibleActionWfs
      }[this.config.type]
    }
  }
}
</script>
