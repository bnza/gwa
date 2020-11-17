<script>
import { WFS } from 'ol/format'
import { mapActions } from 'vuex'
import { identity, mergeAll } from 'ramda'
import { ITEMS_PER_PAGE } from '@/common/constants'
import { addSortByToQueryNode } from '@/modules/server/service/wfs/operations/GetFeature'
import { generateAndFilter } from '@/modules/server/service/wfs/operations/filters'

export default {
  name: 'FeatureDataLoader',
  data () {
    return {
      wfsFormat: null
    }
  },
  props: {
    type: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    featuresResponse: {
      type: Object,
      required: true
    },
    dataOptions: {
      type: Object,
      required: true
    }
  },
  computed: {
    id () {
      return this.data.config.id
    },
    pagination () {
      return {
        maxFeatures: ITEMS_PER_PAGE,
        startIndex: (this.dataOptions.page - 1) * ITEMS_PER_PAGE
      }
    },
    sortBy () {
      if (!this.dataOptions.sortBy.length) {
        return false
      }
      const propertyName = this.dataOptions.sortBy[0].match(/^(properties\.)?(.+)/)[2]
      const sortOrder = this.dataOptions.sortDesc[0] ? 'DESC' : 'ASC'
      return {
        propertyName,
        sortOrder
      }
    },
    filter () {
      return {
        filter: this.dataOptions.filter ? generateAndFilter(this.dataOptions.filter) : null
      }
    },
    parameters () {
      const [ns, name] = this.data.config.name.split(':')
      return mergeAll([
        this.filter,
        this.pagination,
        {
          featurePrefix: ns,
          featureTypes: [name],
          outputFormat: 'application/json'
        }])
    }
  },
  methods: {
    ...mapActions('client', ['fetch']),
    async loader (extent, projection, resolution) {
      let featureRequest = this.wfsFormat.writeGetFeature(this.parameters)
      if (this.sortBy) {
        featureRequest = addSortByToQueryNode(featureRequest, this.sortBy)
      }
      const data = await this.fetch(
        {
          method: 'post',
          headers: { 'Content-Type': 'text/xml' },
          url: `${this.data.server.config.baseUrl}wfs`,
          data: new XMLSerializer().serializeToString(featureRequest)
        }
      )
      return data.cata(() => {
      }, identity)
    },
    async update () {
      this.$emit('update:featuresResponse', await this.loader())
    }
  },
  render: () => null,
  watch: {
    id: {
      handler: 'update'
    },
    dataOptions: {
      handler: 'update'
    }
  },
  created () {
    this.wfsFormat = new WFS()
    this.update()
  }
}
</script>

<style scoped>

</style>
