import { fullValidatedConfig } from '../../__input__/config'
import { getServers, getServer } from '@/modules/config'
import { projectSchema } from '@/modules/schema/project'
import { styleSchema, styleImageVectorStyleSchema, styleCircleImageSchema } from '@/modules/schema/style'

describe('server', () => {
  describe('getServers', () => {
    it('returns a ServerConfigObject array', () => {
      expect(getServers(fullValidatedConfig.toObject())).toBeInstanceOf(Array)
    })
  })
  describe('getServer', () => {
    it('returns a ServerConfigObject', () => {
      expect(getServer(fullValidatedConfig.toObject().servers, 'default')).toBeInstanceOf(Object)
    })
  })
})

describe('schema', () => {
  describe('project', () => {
    const config = {
      title: 'dam',
      description: 'Turkish dam impact over cultural heritage',
      dataProjection: 'EPSG:32637',
      projections: [
        {
          code: 'EPSG:32637',
          def: '+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs'
        }
      ],
      view: {
        center: [257365.64, 4346316.61],
        zoom: 8
      },
      servers: [
        {
          baseUrl: 'http://127.0.0.1/geoserver'
        }
      ],
      groupLayers: [
        {
          name: 'landsat',
          label: 'LANDSAT',
          layers: [
            {
              type: 'wmts',
              label: 'LANDSAT 1984',
              name: 'dam:landsat1984'
            },
            {
              type: 'wmts',
              label: 'LANDSAT 1985',
              name: 'dam:landsat1985'
            },
            {
              type: 'wmts',
              label: 'LANDSAT 1992',
              name: 'dam:landsat1992'
            },
            {
              type: 'wmts',
              label: 'LANDSAT 1998',
              name: 'dam:landsat1998'
            }
          ]
        }],
      layers: [
        {
          type: 'wfs',
          label: 'USA states',
          name: 'topp:states'
        },
        {
          type: 'wfs',
          label: 'TAY Project',
          name: 'dam:TAY_project',
          style: {
            stroke: {
              color: 'AF5733',
              width: 3
            },
            fill: {
              color: 'BB33FF',
              opacity: 0.4
            },
            image: {
              radius: 4,
              points: 4
            }
          }
        }
      ]
    }
    expect(projectSchema.validate(config)).not.toHaveProperty('error')
  })
  describe('styleSchema', () => {
    const config = {
      stroke: {
        color: 'FF5733',
        width: 3
      },
      fill: {
        color: '5E33FF',
        opacity: 0.4
      },
      image: {
        radius: 5
      }
    }
    describe('styleCircleImageSchema', () => {
      it('is valid', () => {
        expect(styleCircleImageSchema.validate(config.image)).not.toHaveProperty('error')
      })
    })
    describe('styleImageVectorStyleSchema', () => {
      it('is valid', () => {
        expect(styleImageVectorStyleSchema.validate(config.image)).not.toHaveProperty('error')
      })
    })
    it('is valid full', () => {
      const a = styleSchema.validate(config)
      expect(a).not.toHaveProperty('error')
    })
    it('is valid without image', () => {
      const config = {
        stroke: {
          color: 'FF5733',
          width: 3
        },
        fill: {
          color: '5E33FF',
          opacity: 0.4
        }
      }
      expect(styleSchema.validate(config)).not.toHaveProperty('error')
    })
    it('is valid without image fill and stroke', () => {
      const config = {
        stroke: {
          color: 'FF5733',
          width: 3
        },
        fill: {
          color: '5E33FF',
          opacity: 0.4
        },
        image: {
          radius: 5
        }
      }
      expect(styleSchema.validate(config)).not.toHaveProperty('error')
    })
  })
})
