<template>
  <v-dialog
    :value="value"
    :width="$vuetify.breakpoint.lgAndUp ? 700 : 'auto'"
    :fullscreen="!$vuetify.breakpoint.lgAndUp"
  >
    <v-card v-if="value">
      <v-toolbar
        dense
        dark
        flat
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Layer Info: <span class="headline"> {{config.label}}</span></v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            info
          </v-icon>
          Info
        </v-tab>
        <v-tab v-if="info.projection">
          <v-icon left>
            tonality
          </v-icon>
          SRS
        </v-tab>
        <v-tab v-if="config.type === 'wfs'">
          <v-icon left>
            article
          </v-icon>
          Attributes
        </v-tab>
        <v-tab-item>
          <v-card class="ma-4" flat>
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                    dense
                    label="Type"
                    readonly
                    :value="config.type"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    dense
                    label="Typename"
                    readonly
                    :value="info.name"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    dense
                    label="Title"
                    readonly
                    :value="info.title"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-textarea
                    dense
                    label="Abstract"
                    readonly
                    :value="info.abstract"
                  ></v-textarea>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="info.projection">
          <v-card class="ma-4" flat>
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                    dense
                    label="Spatial Reference System"
                    readonly
                    :value="info.projection"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="config.type === 'wfs'">
          <v-card class="ma-4" flat>
            <v-form>
              <v-container>
                <v-data-table
                  flat
                  :headers="[
                    {
                      text: 'name',
                      value: 'name'
                    },
                    {
                      text: 'type',
                      value: 'type'
                    }
                    ]"
                  :items="featureType.properties"
                  />
              </v-container>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { SET_ACTIVE_SHOW_LAYER_ID } from '@/store/components/AppDrawerLayersList'

export default {
  name: 'LayerInfoDialog',
  computed: {
    ...mapState('components/AppDrawerLayersList', {
      id: state => state.activeShowInfoLayerId
    }),
    ...mapGetters('layers', ['getLayerInfo', 'getConfig', 'getFeatureType']),
    config () {
      return this.getConfig(this.id)
    },
    info () {
      return this.getLayerInfo(this.id).foldLeft({})((acc, value) => value)
    },
    featureType () {
      return this.getFeatureType(this.id).foldLeft({})((acc, value) => value)
    },
    value () {
      return !!this.id
    }
  },
  methods: {
    ...mapMutations('components/AppDrawerLayersList', [
      SET_ACTIVE_SHOW_LAYER_ID
    ]),
    close () {
      this[SET_ACTIVE_SHOW_LAYER_ID]('')
    }
  }
}
</script>

<style scoped>

</style>
