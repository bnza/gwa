import { WFS } from 'ol/format'
import { addSortByToQueryNode } from '@/modules/server/service/wfs/operations/GetFeature'

describe('GetFeature', () => {
  describe('addSortByToQueryNode', () => {
    it('add expected nodes', () => {
      const format = new WFS()
      let getFeature = format.writeGetFeature({
        featurePrefix: 'namespace',
        featureTypes: ['typeName']
      })
      getFeature = addSortByToQueryNode(getFeature, {
        sortBy: 'id',
        sortDesc: 'DESC'
      })
      expect(getFeature.firstElementChild.tagName).toBe('Query')
      expect(getFeature.firstElementChild.firstElementChild.tagName).toBe('SortBy')
    })
  })
})
