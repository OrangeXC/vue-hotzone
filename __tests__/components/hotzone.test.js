/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Hotzone from '../../lib/components/Hotzone'

describe('component: Hotzone', () => {
  const mocks = {
    image: 'test.jpg',
    zonesInit: [{
      topPer: 0.5,
      leftPer: 0.5,
      widthPer: 0.5,
      heightPer: 0.5
    }, {
      topPer: 0.3,
      leftPer: 0.3,
      widthPer: 0.3,
      heightPer: 0.3
    }],
    zone: {
      topPer: 0.15,
      leftPer: 0.25,
      widthPer: 0.35,
      heightPer: 0.45
    }
  }

  test('props', () => {
    const options = {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit,
        config: {
          maxNum: 5
        }
      }
    }

    const wrapper = mount(Hotzone, options)

    expect(wrapper.props().image).toBe(mocks.image)

    const image = wrapper.find('.hz-u-img')

    expect(image.attributes().src).toBe(mocks.image)

    expect(wrapper.props().zonesInit).toEqual(mocks.zonesInit)
    expect(wrapper.vm.zones).toEqual(mocks.zonesInit)

    expect(wrapper.props().config).toEqual(options.propsData.config)
  })

  test('methods: changeInfo', () => {
    const changeItem = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image
      },
      methods: {
        changeItem
      }
    })

    const res = {
      info: {},
      index: 0
    }

    wrapper.vm.changeInfo(res)

    expect(changeItem).toBeCalledWith(res.info, res.index)
  })

  test('methods: addItem', () => {
    const hasChange = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image
      },
      methods: {
        hasChange
      }
    })

    wrapper.vm.addItem(mocks.zone)

    expect(hasChange).toBeCalled()
    expect(wrapper.vm.zones).toEqual([mocks.zone])
    expect(wrapper.emitted('add')[0][0]).toEqual(mocks.zone)
  })

  test('methods: eraseItem', () => {
    const removeItem = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit
      },
      methods: {
        removeItem
      }
    })

    wrapper.vm.eraseItem()

    expect(removeItem).toHaveBeenCalledWith(1)
    expect(wrapper.emitted('erase')[0][0]).toBe(1)

    wrapper.vm.eraseItem(0)

    expect(removeItem).toHaveBeenCalledWith(0)
    expect(wrapper.emitted('erase')[1][0]).toBe(0)
  })

  test('methods: isOverRange', () => {
    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit,
        config: {
          maxNum: 1
        }
      }
    })

    expect(wrapper.vm.isOverRange()).toBeTruthy()

    wrapper.setProps({
      config: {
        maxNum: 2
      }
    })

    expect(wrapper.vm.isOverRange()).toBeFalsy()
  })

  test('methods: overRange', () => {
    const removeItem = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit
      },
      methods: {
        removeItem
      }
    })

    wrapper.vm.overRange()

    expect(removeItem).toBeCalledWith(1)
    expect(wrapper.emitted('overRange')[0][0]).toBe(1)
  })

  test('methods: removeItem', () => {
    const hasChange = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit
      },
      methods: {
        hasChange
      }
    })

    wrapper.vm.removeItem(0)

    expect(wrapper.vm.zones).toEqual([mocks.zonesInit[1]])
    expect(hasChange).toBeCalled()
    expect(wrapper.emitted('remove')[0][0]).toBe(0)

    wrapper.vm.removeItem()

    expect(wrapper.vm.zones).toEqual([])
    expect(hasChange).toBeCalled()
    expect(wrapper.emitted('remove')[1][0]).toBe(0)
  })

  test('methods: changeItem', () => {
    const hasChange = jest.fn()

    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit
      },
      methods: {
        hasChange
      }
    })

    wrapper.vm.changeItem(mocks.zone, 0)

    expect(wrapper.vm.zones).toEqual([mocks.zone, mocks.zonesInit[1]])
    expect(hasChange).toBeCalled()

    wrapper.vm.changeItem(mocks.zone)

    expect(wrapper.vm.zones).toEqual([mocks.zone, mocks.zone])
    expect(hasChange).toBeCalled()
  })

  test('methods: hasChange', () => {
    const wrapper = mount(Hotzone, {
      propsData: {
        image: mocks.image,
        zonesInit: mocks.zonesInit
      }
    })

    wrapper.vm.hasChange()

    expect(wrapper.emitted('change')[0][0]).toEqual(mocks.zonesInit)
  })
})


