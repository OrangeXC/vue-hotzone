import _ from '../lib/utils'

describe('utils', () => {
  test('getMultiple', () => {
    expect(_.getMultiple()).toBe(10000)
    expect(_.getMultiple(2)).toBe(100)
  })

  test('decimalPoint', () => {
    expect(_.decimalPoint()).toBe(0)
    expect(_.decimalPoint(0.5)).toBe(0.5)
    expect(_.decimalPoint(0.123456)).toBe(0.1235)
  })

  test('getOffset', () => {
    expect(_.getOffset()).toEqual({
      width: 0,
      height: 0
    })

    const elem = {
      clientWidth: 20,
      clientHeight: 50
    }

    expect(_.getOffset(elem)).toEqual({
      width: 20,
      height: 50
    })
  })

  test('getPageX', () => {
    let elem = {
      pageX: 26,
      touches: [{
        pageX: 18
      }]
    }

    expect(_.getPageX(elem)).toBe(26)

    delete elem.pageX

    expect(_.getPageX(elem)).toBe(18)
  })

  test('getPageY', () => {
    let elem = {
      pageY: 26,
      touches: [{
        pageY: 18
      }]
    }

    expect(_.getPageY(elem)).toBe(26)

    delete elem.pageY

    expect(_.getPageY(elem)).toBe(18)
  })

  test('getDistanceX', () => {
    const elem = {
      pageX: 100
    }

    const container = {
      getBoundingClientRect: () => ({
        left: 20
      })
    }

    window.pageXOffset = 5

    expect(_.getDistanceX(elem, container)).toBe(75)
  })

  test('getDistanceY', () => {
    const elem = {
      pageY: 100
    }

    const container = {
      getBoundingClientRect: () => ({
        top: 15
      })
    }

    window.pageYOffset = 5

    expect(_.getDistanceY(elem, container)).toBe(80)
  })

  test('dealEdgeValue', () => {
    let itemInfo = {
      width: 10,
      left: 20
    }

    let styleInfo = {
      left: -1
    }

    expect(_.dealEdgeValue(itemInfo, styleInfo, {})).toEqual({
      left: 0,
      width: 30
    })

    itemInfo = {
      top: 3,
      height: 6
    }

    styleInfo = {
      top: -2
    }

    expect(_.dealEdgeValue(itemInfo, styleInfo, {})).toEqual({
      top: 0,
      height: 9
    })

    itemInfo = {
      left: 2
    }

    styleInfo = {
      width: 23
    }

    let container = {
      width: 8
    }

    expect(_.dealEdgeValue(itemInfo, styleInfo, container)).toEqual({
      left: 2,
      width: 6
    })

    container.width = 1000

    expect(_.dealEdgeValue(itemInfo, styleInfo, container)).toEqual({
      left: 2,
      width: 6
    })

    itemInfo = {
      top: 10
    }

    styleInfo = {
      height: 21
    }

    container = {
      height: 13
    }

    expect(_.dealEdgeValue(itemInfo, styleInfo, container)).toEqual({
      top: 10,
      height: 3
    })

    container.height = 1000

    expect(_.dealEdgeValue(itemInfo, styleInfo, container)).toEqual({
      top: 10,
      height: 3
    })
  })

  test('dealTL', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealTL(itemInfo, 2, 2)).toEqual({
      left: 5,
      top: 6,
      height: 98,
      width: 98
    })

    expect(_.dealTL(itemInfo, 100, 2)).toEqual({
      top: 6,
      height: 98
    })

    expect(_.dealTL(itemInfo, 2, 100)).toEqual({
      left: 5,
      width: 98
    })
  })

  test('dealTC', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealTC(itemInfo, 2, 2)).toEqual({
      top: 6,
      height: 98
    })

    expect(_.dealTC(itemInfo, 2, 100)).toEqual({})
  })

  test('dealTR', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealTR(itemInfo, 2, 2)).toEqual({
      top: 6,
      height: 98,
      width: 102
    })

    expect(_.dealTR(itemInfo, -100, 2)).toEqual({
      top: 6,
      height: 98
    })

    expect(_.dealTR(itemInfo, 2, 100)).toEqual({
      width: 102
    })
  })

  test('dealCL', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealCL(itemInfo, 2, 2)).toEqual({
      left: 5,
      width: 98
    })

    expect(_.dealCL(itemInfo, 100, 2)).toEqual({})
  })

  test('dealCR', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealCR(itemInfo, 2, 2)).toEqual({
      width: 102
    })

    expect(_.dealCR(itemInfo, -100, 2)).toEqual({})
  })

  test('dealBL', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealBL(itemInfo, 2, 2)).toEqual({
      height: 102,
      left: 5,
      width: 98
    })

    expect(_.dealBL(itemInfo, 100, 2)).toEqual({
      height: 102
    })

    expect(_.dealBL(itemInfo, 2, -100)).toEqual({
      left: 5,
      width: 98
    })
  })

  test('dealBC', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealBC(itemInfo, 2, 2)).toEqual({
      height: 102
    })

    expect(_.dealBC(itemInfo, 2, -100)).toEqual({})
  })

  test('dealBR', () => {
    const itemInfo = {
      width: 100,
      height: 100,
      left: 3,
      top: 4
    }

    expect(_.dealBR(itemInfo, 2, 2)).toEqual({
      width: 102,
      height: 102
    })

    expect(_.dealBR(itemInfo, -100, 2)).toEqual({
      height: 102
    })

    expect(_.dealBR(itemInfo, 2, -100)).toEqual({
      width: 102
    })
  })
})
