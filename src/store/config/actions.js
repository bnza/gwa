import Joi from 'joi'
import { compose } from 'ramda'
import { Either } from 'monet'
import { ConfigMutations } from '@/common/constants/mutations'
import { projectSchema } from '@/modules/schema/project'
import { commitEitherFunctor, commitFunctor } from '@/store/utils'

export default {
  loadConfig ({ dispatch, commit }) {
    const commitEither = commitEitherFunctor(commit)
    const commitReturn = commitFunctor(commit)
    /**
     *
     * @param {Error} error
     * @return {Error}
     */
    const commitError = error => commitReturn(ConfigMutations.SET_ERRORS, error)

    /**
     *
     * @param {Either<Error, any>} rawConfig
     * @return {Either<Error, any>}
     */
    const commitRaw = rawConfig => commitEither(ConfigMutations.SET_RAW_CONFIG, rawConfig)
    /**
     *
     * @param {Either<Error, ProjectConfigObject>} config
     * @return {Either<Error, ProjectConfigObject>}
     */
    const commitValid = config => commitEither(ConfigMutations.SET_CONFIG, config)
    /**
     *
     * @param {Either<Error, any>} rawConfig
     * @return {Either<Error, any>|Either<Joi.ValidationError, ProjectConfigObject>}
     */
    const validate = /* @__PURE__ */ rawConfig => {
      return Either.fromTry(() => {
        return rawConfig.map(config => Joi.attempt(config, projectSchema, { abortEarly: false })).right()
      })
    }
    /**
     *
     * @param {Either<Error, AxiosResponse>} response
     * @return {Either<Error, ProjectConfigObject>}
     */
    const loadConfig = response => {
      return (compose(commitValid, validate, commitRaw)(response)).leftMap(commitError)
    }

    return dispatch('client/fetchConfig', null, { root: true }).then(loadConfig)
  }
}
