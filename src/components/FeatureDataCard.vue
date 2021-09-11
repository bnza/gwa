<template>
  <v-card v-if="selectedFeatureMaybe.isNone()" flat>
    <v-card-text>No selected feature</v-card-text>
  </v-card>
  <v-card v-else-if="featureTypeEither.isLeft()" flat>
    <v-card-text>No selected feature</v-card-text>
  </v-card>
  <v-card v-else flat>
    <layer-card-title-tooltip :label="config.label" :title="featureType.title" />
    <v-card-subtitle>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-small
            icon
            color="teal"
            v-bind="attrs"
            v-on="on"
            @click="fitViewExtent(selectedFeature.feature)"
          >
            <v-icon>center_focus_strong</v-icon>
          </v-btn>
        </template>
        <span>Zoom to feature</span>
      </v-tooltip>
      {{ selectedFeature.feature.id }}
    </v-card-subtitle>
    <v-form readonly :style="cssVars">
      <v-container>
        <v-row v-for="(value, name) in selectedFeature.feature.properties" :key="name" justify="center">
          <v-col class="col-md-11 col-sm-12">
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { VTextarea, VTextField } from 'vuetify/lib'
import { Either } from 'monet'
import { getFormIntPixelHeight } from '@/modules/utils'
import LayerCardTitleTooltip from '@/components/LayerCardTitleTooltip'
import { ViewMutations } from '@/common/constants/mutations'
import { GeoJSON } from 'ol/format'
import { clone } from 'ramda'

export default {
  name: 'FeatureDataCard',
  components: {
    LayerCardTitleTooltip
  },
  data () {
    return {
      height: '500px'
    }
  },
  computed: {
    ...mapState('layers', { selectedFeatureMaybe: 'selectedFeature' }),
    ...mapGetters('layers', ['getFeatureType', 'getConfig']),
    config () {
      return this.selectedFeatureMaybe.map(selected => this.getConfig(selected.layer)).some()
    },
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
    ...mapMutations('view', {
      setViewExtent: ViewMutations.SET_EXTENT
    }),
    fitViewExtent (geoJsonFeature) {
      const feature = (new GeoJSON()).readFeature(geoJsonFeature)
      const geom = clone(feature.getGeometry())
      this.setViewExtent([geom])
    },
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

  >>> .v-card__title {
    padding-bottom: 0;
  }
  >>> .v-card__subtitle {
    padding-top: 0;
  }
</style>
