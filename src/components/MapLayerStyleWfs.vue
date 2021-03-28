<template>
  <vl-style-func :function="styleFn" />
</template>

<script>
import { Circle as CircleStyle, RegularShape as RegularShapeStyle, Fill, Stroke, Style } from 'ol/style'
import { convertHexToRGBA } from '@/modules/utils'

const getImageStyle = (style, fill, stroke) => {
  if (Object.prototype.hasOwnProperty.call(style, 'points')) {
    return new RegularShapeStyle({
      fill: fill,
      stroke: stroke,
      points: style.points,
      radius: style.radius,
      radius2: style.radius2,
      angle: style.angle
    })
  }
  return new CircleStyle({
    fill: fill,
    stroke: stroke,
    radius: style.radius
  })
}
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
        let style
        if (Object.prototype.hasOwnProperty.call(this.styleConfig, 'image')) {
          style = new Style({
            image: getImageStyle(this.styleConfig.image, fill, stroke)
          })
        } else {
          style = new Style({
            fill: fill,
            stroke: stroke
          })
        }
        this.styles.push(style)
      }
      return this.styles
    }
  }
}
</script>

<style scoped></style>
