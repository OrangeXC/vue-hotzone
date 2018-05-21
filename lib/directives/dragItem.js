import _ from '../utils'

export default {
  bind: function (el, binding, vnode) {
    el.addEventListener('mousedown', handleMouseDown)

    function handleMouseDown (e) {
      e && e.stopPropagation()

      let container = _.getOffset(el.parentNode)
      let preX = _.getPageX(e)
      let preY = _.getPageY(e)
      let topPer
      let leftPer
      let flag

      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleMouseUp)

      function handleChange (e) {
        e && e.preventDefault()
        flag = true

        // Hide the info displayed by hover
        vnode.context.handlehideZone(true)

        let setting = vnode.context.setting
        let moveX = _.getPageX(e) - preX
        let moveY = _.getPageY(e) - preY

        setting.topPer = setting.topPer || 0
        setting.leftPer = setting.leftPer || 0
        topPer = _.decimalPoint(moveY / container.height + setting.topPer)
        leftPer = _.decimalPoint(moveX / container.width + setting.leftPer)

        // Hotzone moving boundary processing
        if (topPer < 0) {
          topPer = 0
          moveY = -container.height * setting.topPer
        }

        if (leftPer < 0) {
          leftPer = 0
          moveX = -container.width * setting.leftPer
        }

        if (topPer + setting.heightPer > 1) {
          topPer = 1 - setting.heightPer
          moveY = container.height * (topPer - setting.topPer)
        }

        if (leftPer + setting.widthPer > 1) {
          leftPer = 1 - setting.widthPer
          moveX = container.width * (leftPer - setting.leftPer)
        }

        el.style.transform = `translate(${moveX}px, ${moveY}px)`
      }

      function handleMouseUp () {
        if (flag) {
          flag = false
          el.style.transform = 'translate(0, 0)'
          vnode.context.changeInfo({
            topPer,
            leftPer
          })
        }

        // Show the info
        vnode.context.handlehideZone(false)

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
