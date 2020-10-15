<template>
  <v-card v-if="getFeatureType.isLeft" flat>
    <p><span><v-icon color="yellow darken-2">warning</v-icon>{{getFeatureType.left()}}</span></p>
  </v-card>
  <v-card v-else flat>
    <features-data-loader
      :type="type"
      :data="data"
      :features-response.sync="featuresResponse"
      :data-options="dataOptions"
    />
    <v-card-title>{{type.title}}</v-card-title>
    <features-data-table
      :type="type"
      :features-response="featuresResponse"
      :data-options.sync="dataOptions"
      @feature:fit="fitViewExtent"
    />
  </v-card>
</template>

<script>
import { identity, clone } from 'ramda'
import { ViewMutations } from '@/common/constants/mutations'
import { GeoJSON } from 'ol/format'
import { mapGetters, mapMutations } from 'vuex'
import { ITEMS_PER_PAGE } from '@/common/constants'
import FeaturesDataLoader from '@/components/FeaturesDataLoader'
import FeaturesDataTable from '@/components/FeaturesDataTable'

export default {
  name: 'FeatureDataCard',
  components: {
    FeaturesDataLoader,
    FeaturesDataTable
  },
  data () {
    return {
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
      return this.eitherType.cata(() => {}, identity)
    },
    data () {
      return this.getLayer(this.getLayerConfig(this.id))
    }
  },
  methods: {
    ...mapMutations('view', {
      setViewExtent: ViewMutations.SET_EXTENT
    }),
    fitViewExtent (geoJsonFeature) {
      const feature = (new GeoJSON()).readFeature(geoJsonFeature)
      const geom = clone(feature.getGeometry())
      this.setViewExtent(geom.transform(this.type.projection, this.$store.state.config.valid.dataProjection))
    }
  }
}
</script>

<style scoped>

</style>
