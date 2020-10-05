import { Map } from 'immutable'

/**
 *
 * @type {Map<ProjectConfigObject>}
 */
export const fullValidatedConfig = Map({
  title: 'gwa',
  description: 'The test client',
  projections: [{
    code: '26714',
    def: '+proj=utm +zone=14 +datum=NAD27 +units=m +no_defs '
  }],
  view: {
    center: [-11560592.76, 5526675.11],
    zoom: 10,
    projection: 'EPSG:3857'
  },
  servers: [{
    baseUrl: 'http://localhost:8585/geoserver/',
    name: 'default',
    services: {
      wfs: {
        path: 'wfs',
        version: '2.0.0'
      }
    }
  }],
  layers: [{
    type: 'wfs',
    name: 'topp:tasmania_cities',
    id: 'fc5e84aa-1406-4fd0-a276-6c9ee4773469',
    label: 'topp:tasmania_cities',
    opacity: 1,
    visible: true,
    group: 'default',
    style: {
      fill: {
        color: '#FFF',
        opacity: 0.4
      },
      stroke: {
        color: '#3399CC',
        width: 1.25
      },
      image: {
        fill: {
          color: '#FFF',
          opacity: 0.4
        },
        stroke: {
          color: '#3399CC',
          width: 1.25
        },
        radius: 5
      }
    },
    server: 'default'
  }, {
    type: 'wfs',
    name: 'sf:restricted',
    style: {
      stroke: {
        color: '#FF5733',
        width: 3
      },
      fill: {
        color: '#5E33FF',
        opacity: 0.4
      },
      image: {
        fill: {
          color: '#5E33FF',
          opacity: 0.4
        },
        stroke: {
          color: '#FF5733',
          width: 3
        },
        radius: 5
      }
    },
    id: '1937c294-b72c-407a-9e60-7eb1d8205ee2',
    label: 'sf:restricted',
    opacity: 1,
    visible: true,
    group: 'default',
    server: 'default'
  }, {
    type: 'wfs',
    name: 'topp:states',
    style: {
      stroke: {
        color: '#FF5733',
        width: 3
      },
      fill: {
        color: '#5E33FF',
        opacity: 0.4
      },
      image: {
        fill: {
          color: '#5E33FF',
          opacity: 0.4
        },
        stroke: {
          color: '#FF5733',
          width: 3
        },
        radius: 5
      }
    },
    id: '01bbde82-b227-4e9c-bdb6-9dc6bbf7449a',
    label: 'topp:states',
    opacity: 1,
    visible: true,
    group: 'default',
    server: 'default'
  }],
  dataProjection: 'EPSG:3857'
})
