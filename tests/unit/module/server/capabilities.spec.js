import { Right, Left, Either } from 'monet'
import { parseXmlEither } from '@/modules/server/service/capabilities'
import { either } from 'ramda'

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
})
