import { wfsDescribeFeatureTypeResponse } from '@/../tests/__input__/server'
import { findGeometryField } from '@/modules/layer/wfs'

describe('modules/layer', () => {
  describe('findGeometryField', () => {
    it('returns expected value', () => {
      expect(findGeometryField(wfsDescribeFeatureTypeResponse.featureTypes[0].properties)).toEqual('the_geom')
    })
    it('returns undefined when no match', () => {
      const props = Object.values(wfsDescribeFeatureTypeResponse.featureTypes[0].properties)
      props.shift()
      expect(findGeometryField(props)).toBeUndefined()
    })
  })
})
