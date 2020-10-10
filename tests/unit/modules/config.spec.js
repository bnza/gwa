import { fullValidatedConfig } from '../../__input__/config'
import { getServers, getServer } from '@/modules/config'

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
