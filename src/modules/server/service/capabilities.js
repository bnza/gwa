import xml2js from 'xml2js'
import { Right, Left } from 'monet'
/**
 * @typedef {import('monet').Either} Either
 */

/**
 *
 * @param {Either<Error, string>} either
 * @return {Either<Error, Object>}
 */
export const parseXmlEither = either => either.flatMap(parseXml)

/**
 *
 * @param {string} xml
 * @return {Either<Error, Object>}
 */
export const parseXml = xml => {
  let capabilities
  xml2js.parseString(xml, (error, result) => {
    capabilities = error ? Left(error) : Right(result)
  })
  return capabilities
}
