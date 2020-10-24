<template>
  <div>
    <features-data-table-headers :type="type" :headers.sync="headers" />
    <v-data-table
      :headers="headers"
      :items="features"
      item-key="id"
      :height="height"
      :options.sync="options"
      dense
      :server-items-length="featuresResponse.totalFeatures"
      :footer-props="{
        disableItemsPerPage: true,
        itemsPerPageOptions: [ITEMS_PER_PAGE]
      }"
    >
      <template v-slot:header.id="{ }" />
      <template v-slot:item.id="{ item }" >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              icon
              color="teal"
              v-bind="attrs"
              v-on="on"
              @click="$emit('feature:fit', item)"
            >
              <v-icon>center_focus_strong</v-icon>
            </v-btn>
          </template>
          <span>Zoom to feature</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ITEMS_PER_PAGE } from '@/common/constants'
import { getTableIntPixelHeight } from '@/modules/utils'
import FeaturesDataTableHeaders from '@/components/FeaturesDataTableHeaders'
export default {
  name: 'FeaturesDataTable',
  components: {
    FeaturesDataTableHeaders
  },
  data () {
    return {
      headers: [],
      height: '200px'
    }
  },
  props: {
    type: {
      type: Object,
      required: true
    },
    featuresResponse: {
      type: Object,
      default () {
        return {}
      }
    },
    dataOptions: {
      type: Object,
      required: true
    }
  },
  computed: {
    ITEMS_PER_PAGE: () => ITEMS_PER_PAGE,
    features () {
      return this.featuresResponse.features || []
    },
    options: {
      get () {
        return this.dataOptions
      },
      set (options) {
        this.$emit('update:dataOptions', options)
      }
    }
  },
  methods: {
    onResize () {
      this.height = `${getTableIntPixelHeight(window.innerHeight)}px`
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

</style>
