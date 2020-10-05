export default {
  /**
   *
   * @param state
   * @param getters
   * @return {function(name:string, service:Services)}
   */
  service: (state, getters) => (name, service) => {
    return {
      capabilities: getters['server/capabilities/getServerServicesCapabilities'](name, service)
    }
  }
}
