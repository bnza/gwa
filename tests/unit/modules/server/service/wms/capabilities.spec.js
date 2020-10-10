import { Versions } from '@/common/constants/server'
import { capabilitiesXmls } from '@/../tests/__input__/server'
import { parseXml } from '@/modules/server/service/capabilities'
import { getLayersInfos } from '@/modules/server/service/wms/capabilities'

describe('WFS capabilities', () => {
  describe('getLayerInfo', () => {
    it.each([
      [Versions.wms.v110],
      [Versions.wms.v130]
    ])('version "%s" returns expected', (version) => {
      const xml = capabilitiesXmls.wms[version]
      const parsed = parseXml(xml)
      const list = parsed.map(getLayersInfos).right()
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
