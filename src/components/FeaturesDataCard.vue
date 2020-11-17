<template>
  <v-card v-if="getFeatureType.isLeft" flat>
    <p><span><v-icon color="yellow darken-2">warning</v-icon>{{ getFeatureType.left() }}</span></p>
  </v-card>
  <component :is="containerComponent" v-else :value.sync="dialog" flat>
    <features-data-loader
      :type="type"
      :data="data"
      :features-response.sync="featuresResponse"
      :data-options="dataOptions"
    />
    <v-row>
      <v-card-title>{{ type.title }}</v-card-title>
      <v-spacer/>
      <v-card-title>
        <span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="dialog=!dialog"
              >
              <v-icon>{{dialog ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
            </v-btn>
          </template>Toggle fullscreen
        </v-tooltip>
      </span>
        <span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
            <v-icon>filter_alt</v-icon>
            </v-btn>
          </template>Filter features
        </v-tooltip>
        </span>
      </v-card-title>
    </v-row>
    <features-data-table
      :dialog="dialog"
      :type="type"
      :features-response="featuresResponse"
      :data-options.sync="dataOptions"
      @feature:fit="fitViewExtent"
    />
  </component>
</template>

<script>
import { identity, clone } from 'ramda'
import { ViewMutations } from '@/common/constants/mutations'
import { GeoJSON } from 'ol/format'
import { mapGetters, mapMutations } from 'vuex'
import { ITEMS_PER_PAGE } from '@/common/constants'
import FeaturesFullScreenDialog from '@/components/FeaturesFullScreenDialog'
import FeaturesDataLoader from '@/components/FeaturesDataLoader'
import FeaturesDataTable from '@/components/FeaturesDataTable'

export default {
  name: 'FeaturesDataCard',
  components: {
    FeaturesDataLoader,
    FeaturesDataTable,
    FeaturesFullScreenDialog
  },
  data () {
    return {
      dialog: false,
      featuresResponse: {},
      dataOptions: {
        page: 1,
        itemsPerPage: ITEMS_PER_PAGE,
        sortBy: [],
        sortDesc: [false]
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('layers', {
      getFeatureType: 'getFeatureType',
      getLayer: 'get',
      getLayerConfig: 'getConfig'
    }),
    eitherType () {
      return this.getFeatureType(this.id)
    },
    type () {
      return this.eitherType.cata(() => {
      }, identity)
    },
    data () {
      return this.getLayer(this.getLayerConfig(this.id))
    },
    containerComponent () {
      return this.dialog ? 'FeaturesFullScreenDialog' : 'VCard'
    }
  },
  methods: {
    ...mapMutations('view', {
      setViewExtent: ViewMutations.SET_EXTENT
    }),
    fitViewExtent (geoJsonFeature) {
      const feature = (new GeoJSON()).readFeature(geoJsonFeature)
      const geom = clone(feature.getGeometry())
      this.setViewExtent([geom.transform(this.type.projection, this.$store.state.config.valid.dataProjection)])
    }
  }
}
</script>

<style scoped>

</style>
