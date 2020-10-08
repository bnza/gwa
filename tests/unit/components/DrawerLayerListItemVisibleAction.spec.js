import { v4 } from 'uuid'
import { shallowMount, mount } from '@vue/test-utils'
import { Either } from 'monet'
import { Services } from '@/common/constants'
import DrawerLayerListItemVisibleAction from '@/components/DrawerLayerListItemVisibleAction'

const either = Either.left('start')
const id = v4()

describe('DrawerLayerListItemVisibleAction.vue', () => {
  describe('computed', () => {
    describe('component', () => {
      it.each([
        [Services.wfs, 'drawerlayerlistitemvisibleactionwfs-stub']
      ])('type "%s" -> "%s"', (service, component) => {
        const wrapper = shallowMount(
          DrawerLayerListItemVisibleAction,
          {
            propsData: {
              status: either,
              config: {
                id,
                type: service
              }
            }
          })
        expect(wrapper.find(component)).toBeTruthy()
      })
    })
    describe('chainStatus', () => {
      it.each([
        [Services.wfs, 'drawerlayerlistitemvisibleactionwfs-stub']
      ])('type "%s" emits "update:status" when child "%s" triggers', async (service, component) => {
        const wrapper = mount(
          DrawerLayerListItemVisibleAction,
          {
            propsData: {
              status: either,
              config: {
                id,
                type: service
              }
            },
            stubs: {
              DrawerLayerListItemVisibleActionWfs: true
            }
          })
        expect(wrapper.emitted()['update:status']).toBeFalsy()
        wrapper.vm.$children[0].$emit('update:status', Either.of('changed'))
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()['update:status']).toBeTruthy()
      })
    })
  })
})
