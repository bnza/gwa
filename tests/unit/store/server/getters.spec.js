import { keys, length } from 'ramda'
import { Services } from '@/common/constants'

import getters from '@/store/server/getters'
describe('store/server/getters', () => {
  describe('get', () => {
    it('returns expected value', () => {
      const config = Symbol('config')
      const _rootGetters = {
        'config/getServer': jest.fn().mockReturnValue(config)
      }
      const _getters = {
        getService: jest.fn()
      }
      const server = getters.get({}, _getters, null, _rootGetters)('serverName')
      expect(_rootGetters['config/getServer']).toHaveBeenCalledWith('serverName')
      expect(server).toHaveProperty('config')
      expect(server.config).toBe(config)
      expect(server).toHaveProperty('services')
      expect(_getters.getService).toHaveBeenCalledTimes(length(keys(Services)))
    })
  })
})
