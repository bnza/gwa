<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrollable="false"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card flat>
      <v-toolbar
        dense
        dark
        flat
        :rounded="false"
        color="primary"
      >
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                dark
                @click="close"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </template>Close dialog
        </v-tooltip>
        <v-toolbar-title>Filter</v-toolbar-title>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              dark
              @click="openNewFilterDialog"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </template>Add filter
        </v-tooltip>
      </v-toolbar>
      <v-list
        subheader
      >
        <v-subheader v-if="!filters.length">No filter selected</v-subheader>
      </v-list>
      <features-filter-predicate-list-item
        v-for="(filter, index) in filters"
        :key="index"
        :filter="filter"
        :index="index"
        @edit="openEditFilterDialog($event)"
        @delete="openDeleteFilterDialog($event)"
      />
      <v-card-actions>
        <v-btn text outlined @click="close">Cancel</v-btn>
        <v-spacer />
        <v-btn text outlined color="primary" @click="clear" :disabled="!filters.length">Clear</v-btn>
        <v-btn text outlined color="primary" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
    <features-filter-edit-dialog
      :value.sync="filterDialog"
      :type="type"
      :filter="filters[activeFilterIndex]"
      @submit="submitFilterEdit($event)"
    />
  <features-filter-delete-dialog
    :value.sync="filterDeleteDialog"
    @delete="deleteFilter"
  />
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import FeaturesFilterDeleteDialog from '@/components/FeaturesFilterDeleteDialog'
import FeaturesFilterEditDialog from '@/components/FeaturesFilterEditDialog'
import FeaturesFilterPredicateListItem from '@/components/FeaturesFilterPredicateListItem'
import { mergeRight } from 'ramda'

export default {
  name: 'FeaturesFilterDialog',
  components: {
    FeaturesFilterEditDialog,
    FeaturesFilterDeleteDialog,
    FeaturesFilterPredicateListItem
  },
  data () {
    return {
      activeFilterIndex: -1,
      filterDialog: false,
      filterDeleteDialog: false,
      filters: []
    }
  },
  props: {
    type: {
      type: Object,
      required: true
    },
    dataOptions: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (flag) {
        this.$emit('update:value', flag)
      }
    }
  },
  methods: {
    openNewFilterDialog () {
      this.activeFilterIndex = -1
      this.filterDialog = true
    },
    openEditFilterDialog (index) {
      this.activeFilterIndex = index
      this.filterDialog = true
    },
    openDeleteFilterDialog (index) {
      this.activeFilterIndex = index
      this.filterDeleteDialog = true
    },
    deleteFilter () {
      this.filters.splice(this.activeFilterIndex, 1)
    },
    submitFilterEdit (filter) {
      if (this.activeFilterIndex === -1) {
        this.filters.push(filter)
        this.activeFilterIndex = this.filters.length - 1
      } else {
        Vue.set(this.filters, this.activeFilterIndex, filter)
      }
    },
    emit () {
      const options = mergeRight(this.dataOptions, { filter: this.filters })
      this.$emit('update:dataOptions', options)
    },
    close () {
      this.dialog = false
    },
    clear () {
      this.filters = []
      this.emit()
    },
    submit () {
      this.emit()
      this.close()
      this.filters = []
    }
  },
  watch: {
    dataOptions: {
      handler: function (data) {
        this.filters = data.filter
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
