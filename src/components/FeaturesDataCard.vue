<template>
  <v-card v-if="getFeatureType.isLeft" flat>
    <p><span><v-icon color="yellow darken-2">warning</v-icon>{{ getFeatureType.left() }}</span></p>
  </v-card>
  <component :is="containerComponent" v-else :value.sync="tableDialog" flat>
    <features-data-loader
      :type="type"
      :data="data"
      :features-response.sync="featuresResponse"
      :data-options="dataOptions"
    />
    <v-row>
      <v-card-title>{{ type.title }}<span v-if="dataOptions.filter.length" class="pl-6 text-subtitle-2 font-weight-light grey--text">(filtered)</span></v-card-title>
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
                @click="tableDialog=!tableDialog"
              >
              <v-icon>{{ tableDialog ? 'fullscreen_exit' : 'fullscreen' }}</v-icon>
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
                @click="filterDialog = true"
              >
            <v-icon>filter_alt</v-icon>
            </v-btn>
          </template>Filter features
        </v-tooltip>
        </span>
      </v-card-title>
    </v-row>
    <features-filter-dialog
      :value.sync="filterDialog"
      :type="type"
      :data-options.sync="dataOptions"
    />
    <features-data-table
      :dialog="tableDialog"
      :type="type"
      :features-response="featuresResponse"
      :data-options.sync="dataOptions"
      @feature:fit="fitViewExtent"
    />
  </component>
</template>

<script>
import { identity, clone } from 'ramda'
import { ViewMutations, LayersQueryMutations } from '@/common/constants/mutations'
import { GeoJSON } from 'ol/format'
import { mapGetters, mapMutations } from 'vuex'
import { ITEMS_PER_PAGE, Services } from '@/common/constants'
import { WfsOperations } from '@/common/constants/operations'
import FeaturesFilterDialog from '@/components/FeaturesFilterDialog'
import FeaturesFullScreenDialog from '@/components/FeaturesFullScreenDialog'
import FeaturesDataLoader from '@/components/FeaturesDataLoader'
import FeaturesDataTable from '@/components/FeaturesDataTable'

const defaultDataOptions = () => {
  return {
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    sortBy: [],
    sortDesc: [false],
    filter: []
  }
}
export default {
  name: 'FeaturesDataCard',
  components: {
    FeaturesFilterDialog,
    FeaturesDataLoader,
    FeaturesDataTable,
    FeaturesFullScreenDialog
  },
  data () {
    return {
      tableDialog: false,
      filterDialog: false,
      featuresResponse: {}
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
    ...mapGetters('layers/query', {
      getQueryParameters: 'getParameters'
    }),
    dataOptions: {
      get () {
        return this.getQueryParameters({
          service: Services.wfs,
          operation: WfsOperations.GET_FEATURE,
          id: this.id
        }) || defaultDataOptions()
      },
      set (data) {
        this.setGetFeaturesQueryParameters(data)
      }
    },
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
      return this.tableDialog ? 'FeaturesFullScreenDialog' : 'VCard'
    }
  },
  methods: {
    ...mapMutations('view', {
      setViewExtent: ViewMutations.SET_EXTENT
    }),
    ...mapMutations('layers/query', {
      setQueryParameters: LayersQueryMutations.SET_PARAMETERS
    }),
    setGetFeaturesQueryParameters (parameters) {
      this.setQueryParameters({
        service: Services.wfs,
        operation: WfsOperations.GET_FEATURE,
        id: this.id,
        parameters
      })
    },
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
