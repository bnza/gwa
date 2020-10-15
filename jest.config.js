module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['node_modules/(?!(ol|ol-mapbox-style|vuelayers)/)'],
  setupFiles: ['<rootDir>/tests/unit/setup.js']
}
