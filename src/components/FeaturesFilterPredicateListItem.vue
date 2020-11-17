<template>
  <v-list-item>
    <v-list-item-action class="mr-n1">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="red darken-2"
            @click="$emit('delete', index)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>Delete filter
      </v-tooltip>
    </v-list-item-action>
    <v-list-item-action class="mr-n1">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="green"
            @click="$emit('edit', index)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </template>Edit filter
      </v-tooltip>
    </v-list-item-action>
    <v-list-item-content class="pl-2, pr-2">
      <v-switch class="pl-2" readonly :value="filter.negate" hint="not" persistent-hint />
      <v-text-field readonly :value="filter.propertyName.just()" label="Property" />
    </v-list-item-content>
    <v-list-item-content class="pl-2, pr-2">
      <v-text-field readonly :value="filter.operator.text" label="Operator" />
    </v-list-item-content>
    <v-list-item-content v-if="filter.expressions.length" class="pl-2, pr-2">
      <v-text-field class="pl-2, pr-2" v-for="(value, index) in filter.expressions" :key="index" readonly :value="value" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'FeaturesFilterPredicateListItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      propertyName: ''
    }
  }
}
</script>

<style scoped>

</style>
