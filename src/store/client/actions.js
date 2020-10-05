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
 *
 * @param {Either<Error, AxiosResponse>} response
 * @return {*}
 */
const responseData = response => response.map(response => prop('data', response))

/**
 * @param commit
 * @param config
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const request = ({ commit }, config) => {
  const key = Symbol('request')
  commit(ClientMutations.SET_REQUEST_PENDING, key)
  return Either.fromPromise(
    axios.request(config).finally(() => commit(ClientMutations.SET_REQUEST_TERMINATED, key))
  )
}

/**
 * @param commit
 * @param config
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const fetch = ({ commit }, config) => {
  return request({ commit }, config).then(responseData)
}

/**
 *
 * @param commit
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
const fetchConfig = ({ commit }) => {
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

  return fetch({ commit }, config)
}

/**
 * @type {import('vuex').ActionTree<typeof ClientVuexState>}
 */
export default {
  request,
  fetch,
  fetchConfig
}
