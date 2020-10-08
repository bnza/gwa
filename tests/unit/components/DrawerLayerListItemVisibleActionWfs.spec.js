import { v4 } from 'uuid'
import { Store } from 'vuex-mock-store'
import { mount } from '@vue/test-utils'
import { Either } from 'monet'
import DrawerLayerListItemVisibleActionWfs from '@/components/DrawerLayerListItemVisibleActionWfs'

const either = Either.left('start')

const store = new Store({
  state: {
    layers: {}
  },
  getters: { 'layers/getType': () => either }
})

const mocks = {
  $store: store
}

afterEach(() => store.reset())

describe('DrawerLayerListItemVisibleActionWfs.vue', () => {
  describe('watch', () => {
    describe('featureType', () => {
      it('emit "update:status" when changes', async () => {
        const id = v4()
        const wrapper = mount(
          DrawerLayerListItemVisibleActionWfs,
          {
            mocks,
            propsData: {
              status: either,
              id
            }
          })
        store.getters['layers/getType'] = () => Either.of('changed')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()['update:status']).toBeTruthy()
        expect(wrapper.emitted()['update:status'].length).toBe(1)
      })
    })
  })
})
