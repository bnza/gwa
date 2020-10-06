import axios from 'axios'
import { Either } from 'monet'
import { prop } from 'ramda'
import { ClientMutations } from '@/common/constants/mutations'

/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

/**
 * @typedef {import('axios').AxiosError} AxiosError
 */

/**
 * @param commit
 * @param config
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const request = async ({ commit }, config) => {
  const key = Symbol('request')
  commit(ClientMutations.SET_REQUEST_PENDING, key)
  return await Either.fromPromise(
    axios.request(config).finally(() => commit(ClientMutations.SET_REQUEST_TERMINATED, key))
  )
}

/**
 * @param commit
 * @param config
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const fetch = async ({ commit }, config) => {
  return (await request({ commit }, config)).map(prop('data'))
}

/**
 *
 * @param commit
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
const fetchConfig = async ({ commit }) => {
  /**
   * @type {axios}
   */
  const config = {
    method: 'get',
    url: 'config.json',
    headers: {
      Accept: 'application/json'
    }
  }

  return await fetch({ commit }, config)
}

/**
 * @type {import('vuex').ActionTree<typeof ClientVuexState>}
 */
export default {
  request,
  fetch,
  fetchConfig
}
