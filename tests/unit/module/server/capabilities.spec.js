import { Right, Left } from 'monet'
import { parseXmlEither, parseXml, getRoot, getVersion, getService } from '@/modules/server/service/capabilities'
import { Versions } from '@/common/constants/server'
import { Services } from '@/common/constants'
import { capabilitiesXmls } from '@/../tests/__input__/server'

describe('capabilities', () => {
  describe('parseXmlEither', () => {
    it.each([
      ['Right', '<root><test>value</test></root>', true],
      ['Right', 'not xml', false],
      ['Left', 'an error', false]
    ])('"%s" when xml is "%s" either isRight is "%p"', (side, xml, expected) => {
      const eithers = {
        Right,
        Left
      }
      const either = parseXmlEither(eithers[side](xml))
      expect(either.isRight()).toBe(expected)
    })
  })
  describe('getRoot', () => {
    describe.each(Object.keys(Services))('service "%s"', service => {
      it.each([
        [Versions.wfs.v100, 'WFS_Capabilities'],
        [Versions.wfs.v110, 'wfs:WFS_Capabilities'],
        [Versions.wfs.v200, 'wfs:WFS_Capabilities']
      ])('version "%s" returns expected "%s"', (version, expected) => {
        const xml = capabilitiesXmls[service][version]
        const parsed = parseXml(xml)
        expect(parsed.map(getRoot).right()).toBe(expected)
      })
    })
  })
  describe('getVersion', () => {
    describe.each(Object.keys(Services))('service "%s"', service => {
      it.each([
        [Versions.wfs.v100],
        [Versions.wfs.v110],
        [Versions.wfs.v200]
      ])('version "%s" returns expected', (version) => {
        const xml = capabilitiesXmls[service][version]
        const parsed = parseXml(xml)
        expect(parsed.map(getVersion).right()).toBe(version)
      })
    })
  })
  describe('getService', () => {
    describe.each(Object.keys(Services))('service "%s"', service => {
      it.each([
        [Versions.wfs.v100],
        [Versions.wfs.v110],
        [Versions.wfs.v200]
      ])('version "%s" returns expected', (version) => {
        const xml = capabilitiesXmls[service][version]
        const parsed = parseXml(xml)
        expect(parsed.map(getService).right()).toBe(service)
      })
    })
  })
})
