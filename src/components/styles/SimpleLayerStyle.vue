<template>
  <vl-style>
    <component
      v-if="imageComponent"
      :is="imageComponent"
      :radius="image.radius"
      :radius1="image.radius1"
      :radius2="image.radius2"
      :points="image.points"
      :rotation="image.rotation"
    >
      <vl-style-fill :color="fillColor"></vl-style-fill>
      <vl-style-stroke :color="symbology.stroke.color" :width="symbology.stroke.width"></vl-style-stroke>
    </component>
    <vl-style-fill v-if="!imageComponent" :color="fillColor"></vl-style-fill>
    <vl-style-stroke v-if="!imageComponent" :color="symbology.stroke.color" :width="symbology.stroke.width"></vl-style-stroke>
  </vl-style>
</template>

<script>
import { convertHexToRGBA } from '@/modules/utils'
export default {
  name: 'SimpleLayerStyle',
  computed: {
    symbology () {
      return this.$attrs
    },
    image () {
      return this.symbology.image || {}
    },
    imageComponent () {
      if (Object.prototype.hasOwnProperty.call(this.symbology, 'image')) {
        if (Object.prototype.hasOwnProperty.call(this.image, 'points')) {
          return 'vl-style-reg-shape'
        }
        return 'vl-style-circle'
      }
      return ''
    },
    fillColor () {
      return convertHexToRGBA(
        this.symbology.fill.color,
        this.symbology.fill.opacity
      )
    }
  }
}
</script>

<style scoped>

</style>
