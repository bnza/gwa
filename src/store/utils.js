/**
 * @typedef {function(string, any): void} CommitFn
 */

/**
 * @template E
 * @template A
 * @param {CommitFn} commit
 * @return {function(string, Either<E, A>): (Either<E, A>)}}
 */
export const commitEitherFunctor = commit => (mutation, either) => {
  return either.map(right => {
    commit(mutation, right)
    return right
  })
}

/**
 * @template A
 * @param {CommitFn} commit
 * @return {function(string, A): A}
 */
export const commitFunctor = commit => (mutation, payload) => {
  commit(mutation, payload)
  return payload
}
