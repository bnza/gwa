import Vue from 'vue'
import Vuex from 'vuex'
import client from './client'
import config from './config'
import server from './server'

Vue.use(Vuex)

/**
 * @typedef {Object} VuexRootState
 * @property {ClientVuexState} client
 */

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    client,
    config,
    server
  }
})
