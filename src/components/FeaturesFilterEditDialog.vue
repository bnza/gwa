<template>
  <v-dialog
    :value="value"
    persistent
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
        <v-toolbar-title>Add filter</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                dark
                :disabled="isDisabled"
                @click="submit"
              >
                <v-icon color="green">done</v-icon>
              </v-btn>
            </template>Submit filter
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-item>
        <v-list-item-content>
          <v-select
            :items="propertiesList"
            :value="filterObject.propertyName.cata(() => undefined, some => some)"
            @change="filterObject.propertyName = Just($event)"
            label="Property"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="propertyType.isJust()" >
        <v-list-item-content>
          <v-switch class="ml-3" v-model="filterObject.negate" hint="not" persistent-hint/>
          <v-select
            v-model="filterObject.operator"
            v-if="operators.length"
            :items="operators"
            label="Operator"
            return-object
          />
        </v-list-item-content>
        <template v-if="filterObject.operator">
          <v-list-item-content v-if="filterObject.operator.cardinality">
            <v-text-field class="pl-2 pr-2" v-for="i in filterObject.operator.cardinality" :key="i" v-model="filterObject.expressions[i-1]" />
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
import { filter, map, includes, find, propEq, clone } from 'ramda'
import { Maybe } from 'monet'
import { GeometrySupportedTypes } from '@/common/constants'
import { operators as queryOperators } from '@/modules/server/service/wfs/operations/filters'

const defaultFilter = () => {
  return {
    propertyName: Maybe.Nothing(),
    operator: null,
    expressions: [],
    negate: false
  }
}

export default {
  name: 'FeaturesFilterEditDialog',
  data () {
    return {
      filterObject: null
    }
  },
  props: {
    filter: {
      type: Object
    },
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: Object,
      required: true
    }
  },
  computed: {
    operators () {
      return this.propertyType.fold([])(
        propertyType => filter(
          operator =>
            includes(
              propertyType.localType,
              operator.types
            ),
          queryOperators
        ))
    },
    propertiesList () {
      return map(
        property => property.name,
        filter(
          property => !includes(property.localType, GeometrySupportedTypes),
          this.type.properties
        )
      )
    },
    propertyType () {
      return this.filterObject.propertyName.map(name => find(propEq('name', name), this.type.properties))
    },
    isDisabled () {
      return !(this.filterObject.operator && this.filterObject.operator.validate(this.filterObject))
    }
  },
  methods: {
    Just: Maybe.Just,
    close () {
      this.$emit('update:value', false)
    },
    submit () {
      this.filterObject.expressions = this.filterObject.expressions.splice(0, this.filterObject.operator.cardinality)
      this.$emit('submit', clone(this.filterObject))
      this.close()
      this.filterObject = null
    }
  },
  watch: {
    filter: {
      handler (filter) {
        if (!filter) {
          this.filterObject = defaultFilter()
        } else {
          this.filterObject = clone(filter)
        }
      },
      immediate: true
    }
  }
}
</script>
