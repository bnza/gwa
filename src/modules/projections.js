import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'

/**
 * @typedef {Object} Projection
 * @property {string} code
 * @property {string} def
 */

/**
 *
 * @param {Function} request
 * @param {string} code
 * @return {Promise<Either<string>>}
 */
export const fetchProj4Def = async (request, code) => {
  const [, _code] = code.split(':')
  const url = `https://epsg.io/${_code}.proj4`
  return await request({ url })
}

/**
 *
 * @param {?Function} request
 * @param {Projection} projection
 * @return {Promise<void>}
 */
export const registerProjection = async ({ code, def }, request) => {
  if (!def) {
    if (!request) {
      throw new Error(
        'You must supply a proj4 definition string or a request function'
      )
    }
    // TODO error handling
    def = (await fetchProj4Def(request, code)).right()
  }
  proj4.defs(code, def)
  register(proj4)
}
