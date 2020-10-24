<template>
  <v-card v-if="selectedFeatureMaybe.isNone()" flat>
    <v-card-text>No selected feature</v-card-text>
  </v-card>
  <v-card v-else-if="featureTypeEither.isLeft()" flat>
    <v-card-text>No selected feature</v-card-text>
  </v-card>
  <v-card v-else flat>
    <v-card-title>{{ featureType.title }}</v-card-title>
    <v-card-subtitle>{{ selectedFeature.feature.id }}</v-card-subtitle>
    <v-form readonly :style="cssVars">
      <v-container>
        <v-row v-for="(value, name) in selectedFeature.feature.properties" :key="name" justify="center">
          <v-col cols="1" md="11">
            <component
              :is="getComponent(value, name)"
              :value="value"
              :label="name"
              dense
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { VTextarea, VTextField } from 'vuetify/lib'
import { Either } from 'monet'
import { getFormIntPixelHeight } from '@/modules/utils'

export default {
  name: 'FeatureDataCard',
  data () {
    return {
      height: '500px'
    }
  },
  computed: {
    ...mapState('layers', { selectedFeatureMaybe: 'selectedFeature' }),
    ...mapGetters('layers', ['getFeatureType']),
    selectedFeature () {
      return this.selectedFeatureMaybe.some()
    },
    featureTypeEither () {
      return this.selectedFeatureMaybe.fold(Either.Left('No feature type'))(selected => this.getFeatureType(selected.layer))
    },
    featureType () {
      return this.featureTypeEither.right()
    },
    cssVars () {
      return {
        '--height': this.height
      }
    }
  },
  methods: {
    findPropertyType (name) {
      return this.featureType.properties.find(property => property.name === name)
    },
    getComponent (value, name) {
      const type = this.findPropertyType(name)
      if (type.localType === 'string' && value.length > 80) {
        return VTextarea
      }
      return VTextField
    },
    onResize () {
      this.height = `${getFormIntPixelHeight(window.innerHeight)}px`
    }
  },
  created () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy () {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
  >>> form {
    height: var(--height);
    overflow-y: scroll;
  }
</style>
