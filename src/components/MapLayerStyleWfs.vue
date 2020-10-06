<template>
  <vl-style-func :func="styleFn" />
</template>

<script>
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { convertHexToRGBA } from '@/modules/utils'

export default {
  name: 'MapLayerStyleWfs',
  data () {
    return {
      styles: []
    }
  },
  props: {
    styleConfig: {
      type: Object,
      required: true
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    styleFn (feature, resolution) {
      if (!this.styles.length) {
        const fill = new Fill({
          color: convertHexToRGBA(
            this.styleConfig.fill.color,
            this.styleConfig.fill.opacity
          )
        })
        const stroke = new Stroke({
          color: this.styleConfig.stroke.color,
          width: this.styleConfig.stroke.width
        })
        const style = new Style({
          image: new CircleStyle({
            fill: fill,
            stroke: stroke,
            radius: 5
          }),
          fill: fill,
          stroke: stroke
        })
        this.styles.push(style)
      }
      return this.styles
    }
  }
}
</script>

<style scoped></style>
