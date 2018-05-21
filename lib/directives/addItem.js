import _ from '../utils'

export default {
  bind: function (el, binding, vnode) {
    const MIN_LIMIT = _.MIN_LIMIT

    el.addEventListener('mousedown', handleMouseDown)

    function handleMouseDown (e) {
      e && e.preventDefault()

      let itemInfo = {
        top: _.getDistanceY(e, el),
        left: _.getDistanceX(e, el),
        width: 0,
        height: 0
      }
      let container = _.getOffset(el)

      // Only used once at the beginning of init
      let setting = {
        topPer: _.decimalPoint(itemInfo.top / container.height),
        leftPer: _.decimalPoint(itemInfo.left / container.width),
        widthPer: 0,
        heightPer: 0
      }
      let preX = _.getPageX(e)
      let preY = _.getPageY(e)

      vnode.context.addItem(setting)

      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleMouseUp)

      function handleChange (e) {
        e && e.preventDefault()

        let moveX = _.getPageX(e) - preX
        let moveY = _.getPageY(e) - preY
        preX = _.getPageX(e)
        preY = _.getPageY(e)

        // Not consider the direction of movement first, consider only the lower right drag point
        let minLimit = 0
        let styleInfo = _.dealBR(itemInfo, moveX, moveY, minLimit)

        // Boundary value processing
        itemInfo = _.dealEdgeValue(itemInfo, styleInfo, container)

        Object.assign(el.lastElementChild.style, {
          top: `${itemInfo.top}px`,
          left: `${itemInfo.left}px`,
          width: `${itemInfo.width}px`,
          height: `${itemInfo.height}px`
        })
      }

      function handleMouseUp () {
        let perInfo = {
          topPer: _.decimalPoint(itemInfo.top / container.height),
          leftPer: _.decimalPoint(itemInfo.left / container.width),
          widthPer: _.decimalPoint(itemInfo.width / container.width),
          heightPer: _.decimalPoint(itemInfo.height / container.height)
        }

        if (vnode.context.isOverRange()) {
          vnode.context.overRange()
        } else if (container.height < MIN_LIMIT && itemInfo.width > MIN_LIMIT) {
          vnode.context.changeItem(Object.assign(perInfo, {
            topPer: 0,
            heightPer: 1
          }))
        } else if (container.width < MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          vnode.context.changeItem(Object.assign(perInfo, {
            leftper: 0,
            widthPer: 1
          }))
        } else if (itemInfo.width > MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          vnode.context.changeItem(perInfo)
        } else {
          vnode.context.eraseItem()
        }

        window.removeEventListener('mousemove', handleChange)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }

    el.$destroy = () => el.removeEventListener('mousedown', handleMouseDown)
  },
  unbind: function (el) {
    el.$destroy()
  }
}
