import { register } from 'ol/proj/proj4'
import { transformExtent } from 'ol/proj'
import proj4 from 'proj4'

/**
 * @typedef {Object} Projection
 * @property {string} code
 * @property {string} [def]
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
 * @return {Promise<boolean>}
 */
export const registerProjection = async ({ code, def }, request) => {
  if (!def) {
    if (!request) {
      throw new Error(
        'You must supply a proj4 definition string or a request function'
      )
    }
    const either = await fetchProj4Def(request, code)
    either.map(d => {
      proj4.defs(code, d)
      register(proj4)
    })
    return either.isRight()
  }
  proj4.defs(code, def)
  register(proj4)
  return true
}

export const transformWgs84Extent = (extent, destination) => {
  return transformExtent(extent, 'EPSG:4326', destination)
}
