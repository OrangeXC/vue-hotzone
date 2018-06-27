let _ = {
  MIN_LIMIT: 48, // Min size of zone
  DECIMAL_PLACES: 4 // Hotzone positioning decimal point limit number of digits
}

/**
 * Get a power result of 10 for the power of the constant
 * @return {Number}
 */
_.getMultiple = (decimalPlaces = _.DECIMAL_PLACES) => {
  return Math.pow(10, decimalPlaces)
}

/**
 * Limit decimal places
 * @param  {Number} num
 * @return {Number}
 */
_.decimalPoint = (val = 0) => {
  return Math.round(val * _.getMultiple()) / _.getMultiple() || 0
}

/**
 * Get element width and height
 * @param  {Object} elem
 * @return {Object}
 */
_.getOffset = (elem = {}) => ({
  width: elem.clientWidth || 0,
  height: elem.clientHeight || 0
})

/**
 * Get pageX
 * @param  {Object} e
 * @return {Number}
 */
_.getPageX = (e) => ('pageX' in e) ? e.pageX : e.touches[0].pageX

/**
 * Get pageY
 * @param  {Object} e
 * @return {Number}
 */
_.getPageY = (e) => ('pageY' in e) ? e.pageY : e.touches[0].pageY

/**
 * Gets the abscissa value of the mouse click relative to the target node
 * @param  {Object} e
 * @param  {Object} container
 * @return {Number}
 */
_.getDistanceX = (e, container) =>
  _.getPageX(e) - (container.getBoundingClientRect().left + window.pageXOffset)

/**
 * Gets the ordinate value of the mouse click relative to the target node
 * @param  {Object} e
 * @param  {Object} container
 * @return {Number}
 */
_.getDistanceY = (e, container) =>
  _.getPageY(e) - (container.getBoundingClientRect().top + window.pageYOffset)

/**
 * Treatment of boundary conditions when changing the size of the hotzone
 * @param {Object} itemInfo
 * @param {Object} styleInfo
 * @param {Object} container
 */
_.dealEdgeValue = (itemInfo, styleInfo, container) => {
  if (styleInfo.hasOwnProperty('left') && styleInfo.left < 0) {
    styleInfo.left = 0
    styleInfo.width = itemInfo.width + itemInfo.left
  }

  if (styleInfo.hasOwnProperty('top') && styleInfo.top < 0) {
    styleInfo.top = 0
    styleInfo.height = itemInfo.height + itemInfo.top
  }

  if (!styleInfo.hasOwnProperty('left') && styleInfo.hasOwnProperty('width')) {
    if (itemInfo.left + styleInfo.width > container.width) {
      styleInfo.width = container.width - itemInfo.left
    }
  }

  if (!styleInfo.hasOwnProperty('top') && styleInfo.hasOwnProperty('height')) {
    if (itemInfo.top + styleInfo.height > container.height) {
      styleInfo.height = container.height - itemInfo.top
    }
  }

  return Object.assign(itemInfo, styleInfo)
}

/**
 * Handle different drag points, capital letters mean: T-top，L-left，C-center，R-right，B-bottom
 * @param  {Object} itemInfo
 * @param  {Number} moveX
 * @param  {Number} moveY
 * @return {Object}
 */
_.dealTL = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width - moveX
  let height = itemInfo.height - moveY

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width,
      left: itemInfo.left + moveX
    })
  }

  if (height >= Math.min(minLimit, itemInfo.height)) {
    Object.assign(styleInfo, {
      height,
      top: itemInfo.top + moveY
    })
  }

  return styleInfo
}

_.dealTC = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let height = itemInfo.height - moveY

  if (height >= Math.min(minLimit, itemInfo.height)) {
    styleInfo = {
      height,
      top: itemInfo.top + moveY
    }
  }

  return styleInfo
}

_.dealTR = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width + moveX
  let height = itemInfo.height - moveY

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width
    })
  }

  if (height >= Math.min(minLimit, itemInfo.height)) {
    Object.assign(styleInfo, {
      height,
      top: itemInfo.top + moveY
    })
  }

  return styleInfo
}

_.dealCL = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width - moveX

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width,
      left: itemInfo.left + moveX
    })
  }

  return styleInfo
}

_.dealCR = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width + moveX

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width
    })
  }

  return styleInfo
}

_.dealBL = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width - moveX
  let height = itemInfo.height + moveY

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width,
      left: itemInfo.left + moveX
    })
  }

  if (height >= Math.min(minLimit, itemInfo.height)) {
    Object.assign(styleInfo, {
      height
    })
  }

  return styleInfo
}

_.dealBC = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let height = itemInfo.height + moveY

  if (height >= Math.min(minLimit, itemInfo.height)) {
    Object.assign(styleInfo, {
      height
    })
  }

  return styleInfo
}

_.dealBR = (itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) => {
  let styleInfo = {}
  let width = itemInfo.width + moveX
  let height = itemInfo.height + moveY

  if (width >= Math.min(minLimit, itemInfo.width)) {
    Object.assign(styleInfo, {
      width
    })
  }

  if (height >= Math.min(minLimit, itemInfo.height)) {
    Object.assign(styleInfo, {
      height
    })
  }

  return styleInfo
}

export default _
