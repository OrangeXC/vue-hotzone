import { mount } from '@vue/test-utils'
import Zone from '../../lib/components/Zone'

describe('component: Zone', () => {
  const mocks = {
    setting: {
      topPer: 0.15,
      leftPer: 0.25,
      widthPer: 0.35,
      heightPer: 0.45
    }
  }

  test('template', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting,
        index: 0
      }
    })

    const ul = wrapper.find('.hz-m-box')

    expect(ul.classes()).toContain('hz-m-hoverbox')

    const indexWrap = wrapper.find('.hz-u-index')

    expect(indexWrap.attributes().title).toBe('热区1')
    expect(indexWrap.text()).toBe('1')

    const closeWrap = wrapper.find('.hz-u-close')

    expect(closeWrap.isVisible()).toBeTruthy()
    expect(closeWrap.attributes().title).toBe('删除该热区')
    expect(closeWrap.classes()).toContain('hz-icon')
    expect(closeWrap.classes()).toContain('hz-icon-trash')

    const pointers = ['dealTL', 'dealTC', 'dealTR', 'dealCL', 'dealCR', 'dealBL', 'dealBC', 'dealBR']

    pointers.forEach((item, index) => {
      const square = wrapper.findAll('.hz-u-square').at(index)

      expect(square.attributes()['data-pointer']).toBe(item)
      expect(square.classes()).toContain(`hz-u-square-${item.slice(4).toLowerCase()}`)
    })
  })

  test('mounted', () => {
    const setZoneInfo = jest.fn()

    mount(Zone, {
      propsData: {
        setting: mocks.setting
      },
      methods: {
        setZoneInfo
      }
    })

    expect(setZoneInfo).toBeCalledWith(mocks.setting)
  })

  test('methods: setZoneInfo', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting
      }
    })

    expect(wrapper.vm.zoneTop).toBe('15%')
    expect(wrapper.vm.zoneLeft).toBe('25%')
    expect(wrapper.vm.zoneWidth).toBe('35%')
    expect(wrapper.vm.zoneHeight).toBe('45%')
    expect(wrapper.vm.tooSmall).toBeFalsy()

    wrapper.vm.setZoneInfo({
      topPer: 0.05,
      leftPer: 0.05,
      widthPer: 0.005,
      heightPer: 0.0005
    })

    expect(wrapper.vm.zoneTop).toBe('5%')
    expect(wrapper.vm.zoneLeft).toBe('5%')
    expect(wrapper.vm.zoneWidth).toBe('0.5%')
    expect(wrapper.vm.zoneHeight).toBe('0.05%')
    expect(wrapper.vm.tooSmall).toBeTruthy()
  })

  test('methods: handlehideZone', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting
      }
    })

    expect(wrapper.vm.hideZone).toBeFalsy()

    wrapper.vm.handlehideZone()

    expect(wrapper.vm.hideZone).toBeTruthy()

    wrapper.vm.handlehideZone(true)

    expect(wrapper.vm.hideZone).toBeTruthy()

    wrapper.vm.handlehideZone(false)

    expect(wrapper.vm.hideZone).toBeFalsy()
  })

  test('methods: changeInfo', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting,
        index: 3
      }
    })

    wrapper.vm.changeInfo(mocks.setting)

    expect(wrapper.emitted('changeInfo')[0][0]).toEqual({
      info: mocks.setting,
      index: 3
    })

    wrapper.setProps({ index: 0 })
    wrapper.vm.changeInfo()

    expect(wrapper.emitted('changeInfo')[1][0]).toEqual({
      info: {},
      index: 0
    })
  })

  test('methods: delItem', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting,
        index: 0
      }
    })

    const closeWrap = wrapper.find('.hz-u-close')

    closeWrap.trigger('click')

    expect(wrapper.emitted('delItem')[0][0]).toBe(0)
  })

  test('methods: getZoneStyle', () => {
    const wrapper = mount(Zone, {
      propsData: {
        setting: mocks.setting
      }
    })

    expect(wrapper.vm.getZoneStyle()).toBe('0%')
    expect(wrapper.vm.getZoneStyle(0.36)).toBe('36%')
  })
})
