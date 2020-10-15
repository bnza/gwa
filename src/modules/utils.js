const mainToolbarHeight = 48
const mainFooterHeight = 36
const drawerTabsHeight = 72
const tableTitleHeight = 32
const tableHeadersHeight = 38
const tableFooterHeight = 58

/**
 * Return the map height in pixel
 * @param innerHeight
 * @return {number} the map height in pixel
 * @private
 */
export const getMapIntPixelHeight = /* @__PURE__ */ innerHeight => {
  return innerHeight - (mainToolbarHeight + mainFooterHeight)
}

/**
 * Return the map height in pixel
 * @param innerHeight
 * @return {number} the map height in pixel
 * @private
 */
export const getTableIntPixelHeight = /* @__PURE__ */ innerHeight => {
  return innerHeight - (mainToolbarHeight + drawerTabsHeight + tableTitleHeight + tableHeadersHeight + tableFooterHeight)
}

/**
 * @template O
 * @param {O} obj
 * @return {Readonly<O>}
 */
export const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) { deepFreeze(obj[prop]) }
  })
  return Object.freeze(obj)
}

/**
 * @see https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
 * @param {string} hexCode
 * @param {number} opacity
 * @return {string}
 */
export const convertHexToRGBA = /* @__PURE__ */ (hexCode, opacity) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity})`
}

export const stripCrsNamespace = string =>
  string.replace(/(.+)(EPSG):{1,2}(\d+)$/, '$2:$3')

export const appendSlash = string => {
  if (typeof string === 'string') {
    if (string.slice(-1) !== '/') {
      string += '/'
    }
  }
  return string
}

export const capitalize = s => {
  if (typeof s !== 'string') {
    return s
  }
  return s[0].toUpperCase() + s.slice(1)
}
