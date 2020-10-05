export const WFS_VERSION_100 = '1.0.0'
export const WFS_VERSION_110 = '1.1.0'
export const WFS_VERSION_200 = '2.0.0'

/**
 * @readonly {string}
 * @enum
 */
export const WfsVersions = Object.freeze({
  v100: WFS_VERSION_100,
  v110: WFS_VERSION_110,
  v200: WFS_VERSION_200
})

export const Versions = Object.freeze({
  wfs: WfsVersions
})
