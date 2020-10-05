import { Versions } from '@/common/constants/server'
import { capabilitiesXmls } from '@/../tests/__input__/server'
import { parseXml } from '@/modules/server/service/capabilities'
import { getFeatureTypeList } from '@/modules/server/service/wfs/capabilities'

describe('WFS capabilities', () => {
  describe('getFeatureTypeList', () => {
    it.each([
      [Versions.wfs.v100],
      [Versions.wfs.v110],
      [Versions.wfs.v200]
    ])('version "%s" returns expected', (version) => {
      const xml = capabilitiesXmls.wfs[version]
      const parsed = parseXml(xml)
      const list = parsed.map(getFeatureTypeList).right()
      expect(Array.isArray(list)).toBeTruthy()
      list.forEach(
        type => {
          ['name', 'title', 'abstract', 'extent', 'projection'].forEach(
            key => expect(type).toHaveProperty(key)
          )
          type.extent.forEach(n => expect(typeof n).toBe('number'))
        }
      )
    })
  })
})
