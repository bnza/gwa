export const WFS_VERSION_100 = '1.0.0'
export const WFS_VERSION_110 = '1.1.0'
export const WFS_VERSION_200 = '2.0.0'

export const WMS_VERSION_110 = '1.1.0'
export const WMS_VERSION_111 = '1.1.1'
export const WMS_VERSION_130 = '1.3.0'

export const WMTS_VERSION_100 = '1.0.0'

/**
 * @readonly {string}
 * @enum
 */
export const WfsVersions = Object.freeze({
  v100: WFS_VERSION_100,
  v110: WFS_VERSION_110,
  v200: WFS_VERSION_200
})

/**
 * @readonly {string}
 * @enum
 */
export const WmsVersions = Object.freeze({
  v110: WMS_VERSION_110,
  v111: WMS_VERSION_111,
  v130: WMS_VERSION_130
})

/**
 * @readonly {string}
 * @enum
 */
export const WmtsVersions = Object.freeze({
  v100: WMTS_VERSION_100
})

export const Versions = Object.freeze({
  wms: WmsVersions,
  wfs: WfsVersions,
  wmts: WmtsVersions
})
