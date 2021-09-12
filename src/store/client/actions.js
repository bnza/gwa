import axios from 'axios'
import { Either, Left, Right } from 'monet'
import { prop } from 'ramda'
import { ClientMutations } from '@/common/constants/mutations'
import { error } from 'vuelayers/dist/utils'

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

export const requestPromise = ({ commit }, config) => {
  const key = Symbol('request')
  commit(ClientMutations.SET_REQUEST_PENDING, key)
  return axios.request(config)
    .then(response => Right(response))
    .catch(e => Left(error))
    .finally(ClientMutations.SET_REQUEST_TERMINATED, key)
}

/**
 * @param commit
 * @param config
 * @return {Promise<Either<Error, AxiosResponse>>}
 */
export const fetch = async ({ commit }, config) => {
  return (await request({ commit }, config)).map(prop('data'))
}

export const fetchPromise = ({ commit }, config) => {
  return requestPromise({ commit }, config).then(
    either => either.map(prop('data'))
  )
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
  fetchConfig,
  requestPromise,
  fetchPromise
}
