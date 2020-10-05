import capabilities from './capabilities'
// const  server =  {
//   services: {
//     wfs: {
//       operations: {},
//       capabilities: {}
//     }
//   }
// }
const state = {

}

export default {
  strict: true,
  namespaced: true,
  state,
  modules: {
    capabilities
  }
}
