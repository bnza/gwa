import axios from 'axios'
import { Either } from 'monet'
import { prop } from 'ramda'
import { ClientMutations } from '@/common/constants/mutations'

/**
 * @typedef {import('monet').Either} Either
 */

/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
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
 *
 * @param commit
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const fetchConfig = ({ commit }) => {
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

  return request({ commit }, config).then(responseData)
}

/**
 * @type {import('vuex').ActionTree<typeof ClientVuexState>}
 */
export default {
  request,
  fetchConfig
}
