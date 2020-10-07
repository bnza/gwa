import { Either } from 'monet'
import getters from '@/store/server/capabilities/getters'
import { Versions } from '@/common/constants/server'

describe('store/server/capabilities/getters', () => {
  describe('get', () => {
    it('returns expected', () => {
      const wfs = Either.of({})
      const state = {
        default: {
          wfs
        }
      }
      expect(getters.get(state)('default', 'wfs')).toBe(wfs)
    })
    it.each([
      ['valid', 'wrong'],
      ['wrong', 'wfs']
    ])('returns left when server is "%s" and service is "%s"', (server, service) => {
      const wfs = Either.of({})
      const state = {
        default: {
          wfs
        }
      }
      expect(getters.get(state)(server, service).isLeft()).toBeTruthy()
    })
  })
})
